import { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import usePcContext from "@/context/peerConnectionContext";
// import { useSocketContext } from "@/context/socketContext";
import { io } from "socket.io-client";

export default function VideoCall() {
  const socket = useMemo(() => {
    return io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
      transports: ["websocket"],
      auth: { username: localStorage.getItem("email") },
    });
  }, []);
  const [strangerId, setStrangerId] = useState(null);
  const localVideo = useRef<HTMLVideoElement | null>(null);
  const remoteVideo = useRef<HTMLVideoElement | null>(null);
  const polite = useRef(false);
  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("socket not working");
    });
    socket.on("connect", () => console.log("socket working"));
    socket.emit("connectPeer");

    socket.on("peer", (v) => {
      setStrangerId(v.strangerId);
      polite.current = v.polite;
    });
  }, []);

  useEffect(() => {
    if (strangerId) {
      async function getVideo() {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        for (const track of stream.getTracks()) {
          pc.addTrack(track, stream);
        }
        if (localVideo.current) localVideo.current.srcObject = stream;
      }
      const config = { iceServers: [{ urls: "stun:stun.mystunserver.tld" }] };
      const pc = new RTCPeerConnection(config);
      getVideo();

      pc.ontrack = ({ track, streams }) => {
        track.onunmute = () => {
          console.log("track unmuted");
          if (!remoteVideo.current) return;
          if (remoteVideo.current.srcObject) return;
          remoteVideo.current.srcObject = streams[0];
        };
      };

      pc.onnegotiationneeded = async () => {
        try {
          makingOffer.current = true;
          await pc.setLocalDescription();
          console.log("sent offer");
          socket.emit("message", {
            description: pc.localDescription,
            to: strangerId,
          });
        } catch (err) {
          console.error(err);
        } finally {
          makingOffer.current = false;
        }
      };
      pc.onicecandidate = ({ candidate }) =>
        socket.emit("message", { candidate, to: strangerId });

      socket.on("message", async (m) => {
        const [description, candidate] = [m["description"], m["candidate"]];
        if (m === undefined) return;
        try {
          if (description) {
            const offerCollision =
              description.type === "offer" &&
              (makingOffer.current || pc.signalingState !== "stable");

            ignoreOffer.current = !polite.current && offerCollision;
            if (ignoreOffer.current) {
              console.log(
                "ignore offer",
                ignoreOffer.current,
                "polite",
                polite.current,
                "pc.signalingState",
                pc.signalingState,
                "offerCollision",
                offerCollision
              );
              return;
            }

            await pc.setRemoteDescription(description);
            console.log("recived offer");
            if (description.type === "offer") {
              await pc.setLocalDescription();
              socket.emit("message", {
                description: pc.localDescription,
                to: strangerId,
              });
              console.log("sent answer");
            }
          } else if (candidate) {
            try {
              await pc.addIceCandidate(candidate);
              console.log("added ice candidate");
            } catch (err) {
              if (!ignoreOffer.current) {
                throw err;
              }
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
    }
  }, [strangerId, polite]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-white">
        don't worry if you see a blank page open two tab of the the page side by
        side and then try opening this page, one's it is connected don't
        refereshe the page you will stuck at loophole where only one cam work,
        due to incommplete server.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <video
            ref={localVideo}
            id="localVideo"
            autoPlay
            playsInline
            muted
            className="w-full h-auto bg-gray-800 rounded-lg shadow-lg"
          />
          <span className="absolute bottom-2 left-2 bg-gray-900 text-white px-2 py-1 rounded-md text-sm">
            You
          </span>
        </div>
        <div className="relative">
          <video
            ref={remoteVideo}
            id="remoteVideo"
            autoPlay
            playsInline
            muted
            className="w-full h-auto bg-gray-800 rounded-lg shadow-lg"
          />
          <span className="absolute bottom-2 left-2 bg-gray-900 text-white px-2 py-1 rounded-md text-sm">
            Remote
          </span>
        </div>
      </div>
      {/* <div className="flex space-x-4">
        <Button
          onClick={handleNew}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          New
        </Button>
        <Button
          onClick={handleEnd}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          End
        </Button>
      </div> */}
    </div>
  );
}
