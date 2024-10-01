import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "../../assets/img/btc.png";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  SendHorizontal,
  Flag,
  PhoneOff,
  ChevronDown,
  SkipForward,
} from "lucide-react";
import { Socket, io } from "socket.io-client";

interface Message {
  text: string;
  sender: string;
}

interface PeerData {
  pairedUserId: string;
  polite: boolean;
}

export default function VideoCall(): JSX.Element {
  const socket: Socket = useMemo(() => {
    return io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
      transports: ["websocket"],
      auth: { username: localStorage.getItem("email") },
    });
  }, []);

  const [strangerId, setStrangerId] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMatched, setIsMatched] = useState<boolean>(false);

  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const polite = useRef<boolean>(false);
  const makingOffer = useRef<boolean>(false);
  const ignoreOffer = useRef<boolean>(false);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    socket.on("disconnect", () => console.log("socket not working"));
    socket.on("connect", () => console.log("socket working"));
    socket.emit("connectPeer");

    socket.on("peer", (v: PeerData) => {
      setStrangerId(v.pairedUserId);
      polite.current = v.polite;
      setIsMatched(true);
    });

    socket.on('strangerLeft', () => {
      setIsMatched(false);
      setMessages([]);
      setStrangerId(null);
      polite.current = false;
      socket.emit('connectPeer')
    })

    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.off("peer");
    };
  }, [socket]);

  useEffect(() => {
    if (!strangerId) return;

    const config: RTCConfiguration = { iceServers: [{ urls: "stun:stun.mystunserver.tld" }] };
    const pc = new RTCPeerConnection(config);
    pcRef.current = pc;

    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        if (localVideo.current) localVideo.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }

    getMedia();

    pc.ontrack = ({ track, streams }) => {
      track.onunmute = () => {
        if (remoteVideo.current && !remoteVideo.current.srcObject) {
          remoteVideo.current.srcObject = streams[0];
        }
      };
    };

    pc.onnegotiationneeded = async () => {
      try {
        makingOffer.current = true;
        await pc.setLocalDescription();
        socket.emit("message", {
          description: pc.localDescription,
          to: strangerId,
        });
      } catch (err) {
        console.error("Error during negotiation:", err);
      } finally {
        makingOffer.current = false;
      }
    };

    pc.onicecandidate = ({ candidate }) => {
      socket.emit("message", { candidate, to: strangerId });
    };

    socket.on("message", async (m: { description?: RTCSessionDescriptionInit, candidate?: RTCIceCandidateInit }) => {
      if (!m) return;
      const { description, candidate } = m;

      try {
        if (description) {
          const offerCollision =
            description.type === "offer" &&
            (makingOffer.current || pc.signalingState !== "stable");

          ignoreOffer.current = !polite.current && offerCollision;
          if (ignoreOffer.current) return;

          await pc.setRemoteDescription(description);
          if (description.type === "offer") {
            await pc.setLocalDescription();
            socket.emit("message", {
              description: pc.localDescription,
              to: strangerId,
            });
          }
        } else if (candidate) {
          try {
            await pc.addIceCandidate(candidate);
          } catch (err) {
            if (!ignoreOffer.current) throw err;
          }
        }
      } catch (err) {
        console.error("Error processing message:", err);
      }
    });

    return () => {
      pc.close();
      socket.off("message");
    };
  }, [strangerId, socket]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSkip = () => {
    setIsMatched(false);
    setMessages([]);
    socket.emit("skip", strangerId);
  };

  const handleEndCall = () => {
    setIsMatched(false);
    setMessages([]);
    socket.emit("end");
  };

  const handleReport = () => {
    socket.emit("report", { strangerId });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = { text: message, sender: "You" };
      setMessages([...messages, newMessage]);
      socket.emit("chat", { message, to: strangerId });
      setMessage("");
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-3 rounded-md" />
          <span className="font-bold text-2xl text-blue-400">
            VideoChat Pro
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex items-center space-x-2 bg-gray-700 rounded-full py-2 px-4 hover:bg-gray-600 transition duration-200"
          >
            <img
              src={logo}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-blue-400"
            />
            <span className="font-medium">Username</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {isNavOpen && (
            <nav className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg py-2 z-10">
              {[
                { icon: User, text: "Profile" },
                { icon: Settings, text: "Settings" },
                { icon: HelpCircle, text: "Help" },
                { icon: LogOut, text: "Logout" },
              ].map(({ icon: Icon, text }) => (
                <a
                  key={text}
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-700 transition duration-200"
                >
                  <Icon className="mr-3 text-blue-400" size={18} />
                  <span className="text-sm font-medium">{text}</span>
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="flex-1 flex p-6 space-x-6">
        <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
          <div className="flex-1 relative bg-gray-900">
            {isMatched ? (
              <video
                ref={remoteVideo}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
                <p className="text-3xl text-white font-semibold">
                  Finding your match...
                </p>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <button
                onClick={handleReport}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition duration-200 shadow-md"
              >
                <Flag size={20} />
              </button>
            </div>

            <div className="absolute bottom-4 right-4 flex space-x-4">
              <button
                onClick={handleEndCall}
                className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transition duration-200 shadow-lg flex items-center justify-center"
              >
                <PhoneOff size={28} />
              </button>
              <button
                onClick={handleSkip}
                className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-3 transition duration-200 shadow-md"
              >
                <SkipForward size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
          <video
            ref={localVideo}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end">
            <div
              ref={chatContainerRef}
              className="p-4 space-y-4 overflow-y-auto max-h-[70%] scrollbar-hide"
            >
              {messages.map((msg, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <img
                    src={logo}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-gray-600 self-start"
                  />
                  <div
                    className={`p-3 rounded-lg max-w-[75%] ${
                      msg.sender === "You"
                        ? "bg-blue-500 bg-opacity-75 text-white"
                        : "bg-gray-600 bg-opacity-75 text-gray-100"
                    } shadow-md ml-2`}
                  >
                    <p className="text-sm leading-snug">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-100 placeholder-gray-400 pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-blue-600 text-white rounded-full p-2 transition duration-200 shadow-md"
                  >
                    <SendHorizontal size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
