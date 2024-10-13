import { useEffect, useMemo, useState } from "react";
import LocalVid from "./localVid";
import RemoteVid from "./remotevid";
import Media from "../utils/MediaStream";
import { WebRTC } from "../utils/webRTC";
import ChatBox from "../btn/chatInterface";
import Controls from "../btn/controlBtn";
import { io } from "socket.io-client";

type strangerProp = {

  pairId: string;
  pairName: string;
  polite: boolean;
};

interface messageProp {
  text: string;
  sender: string;
}

export default function SoloCall() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [stranger, setStranger] = useState<strangerProp | null>(null);
  const webRTC = useMemo(() => new WebRTC(), [])
  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
        transports: ["websocket"],
        auth: { username: localStorage.getItem("username") },
      }),
    [],
  );
  const pc = useMemo(() => webRTC.PeerConnection, [stream, socket, stranger]);
  const [isMatched, setIsMatched] = useState(false);
  const [messages, setMessages] = useState<messageProp[]>([]);

  async function media() {
    await webRTC.start(); //start the stream too from Media class
    setStream(Media.Stream);
  }

  function handelPeer(data: strangerProp) {
    console.log("recieved strgaer id and username", socket?.id);
    setStranger({
      pairId: data.pairId,
      pairName: data.pairName,
      polite: data.polite,
    });
    setIsMatched(true);
  }

  function handelCallEnd() {
    setMessages([]);
    setStranger(null);
    webRTC.polite = false;
  }

  function strangerLeft() {
    handelCallEnd();
    socket?.emit("connectPeer");
    console.log(socket?.id);
    setIsMatched(false);

    console.log("recieved stranger left");
  }

  const handleBeforeUnload = () => {
    socket?.emit("pairedclosedtab", stranger?.pairId);
    socket?.disconnect();
  };

  useEffect(() => {
	  media()
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => console.log("socket connected"));
    socket.emit("connectPeer");
    socket.on("peer", handelPeer);
    socket.on("strangerLeft", strangerLeft);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("peer", handelPeer);
      socket.off("strangerLeft", strangerLeft);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket, isMatched]);

  useEffect(() => {
    stranger?.pairId ? setIsMatched(true) : setIsMatched(false);

    console.log("isMatched", isMatched);
    return () => setIsMatched(false);
  }, [stranger]);

  useEffect(() => {
    if (pc && socket && stranger) {
      console.log(stranger.pairName);
      webRTC.sendOffer(socket, stranger.pairId);

      socket.on("message", (m) =>
        webRTC.handelOffer({
          socket: socket,
          message: m,
          strangerId: stranger.pairId,
          polite: stranger.polite,
        }),
      );

      socket.on("chat", (m: string) => {
        console.log("chat", socket.id);
        const chat = m.trim();
        const newMessage: messageProp = {
          text: chat,
          sender: "stranger",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off("disconnect");
        socket.off("connect");
        socket.off("peer");
      };
    }
  }, [pc, socket, stranger]);

  useEffect(() => {
    if (!socket) return;
  }, [socket]);

  return (
    <>
      <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="flex-1 relative bg-gray-900">
          {isMatched ? (
            <>
              <RemoteVid pc={pc} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-xl font-semibold text-white">
                  {stranger?.pairName}
                </p>
              </div>
              <Controls
                setIsMatched={setIsMatched}
                setMessages={setMessages}
                strangerId={stranger?.pairId}
                socket={socket}
                endCall={handelCallEnd}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
              <p className="text-3xl text-white font-semibold">
                Finding your match...
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
        <LocalVid stream={stream} />
        <ChatBox
          socket={socket}
          strangerId={stranger?.pairId}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </>
  );
}
