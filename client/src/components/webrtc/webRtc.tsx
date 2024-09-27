import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "../../assets/img/btc.png";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Send,
  SkipForward,
  Flag,
  PhoneOff,
  ChevronDown,
} from "lucide-react";
import { io } from "socket.io-client";

export default function VideoCall() {
  const socket = useMemo(() => {
    return io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
      transports: ["websocket"],
      auth: { username: localStorage.getItem("email") },
    });
  }, []);

  const [strangerId, setStrangerId] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isMatched, setIsMatched] = useState(false);

  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const chatContainerRef = useRef(null);
  const polite = useRef(false);
  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);
  const pcRef = useRef(null);

  useEffect(() => {
    socket.on("disconnect", () => console.log("socket not working"));
    socket.on("connect", () => console.log("socket working"));
    socket.emit("connectPeer");

    socket.on("peer", (v) => {
      setStrangerId(v.strangerId);
      polite.current = v.polite;
      setIsMatched(true);
    });

    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.off("peer");
    };
  }, [socket]);

  useEffect(() => {
    if (!strangerId) return;

    const config = { iceServers: [{ urls: "stun:stun.mystunserver.tld" }] };
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

    socket.on("message", async (m) => {
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
    socket.emit("skip");
  };

  const handleEndCall = () => {
    setIsMatched(false);
    setMessages([]);
    socket.emit("end");
  };

  const handleReport = () => {
    socket.emit("report", { strangerId });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { text: message, sender: "You" };
      setMessages([...messages, newMessage]);
      socket.emit("chat", { message, to: strangerId });
      setMessage("");
    }
  };

  const toggleVideo = () => {
    const videoTrack = localVideo.current.srcObject.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    const audioTrack = localVideo.current.srcObject.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsAudioOn(!isAudioOn);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2 rounded-md" />
          <span className="font-bold text-xl text-indigo-600">
            VideoChat Pro
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex items-center space-x-2 bg-gray-100 rounded-full py-2 px-4 hover:bg-gray-200 transition duration-200"
          >
            <img
              src={logo}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span className="font-medium">Username</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {isNavOpen && (
            <nav className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
              {[
                { icon: User, text: "Profile" },
                { icon: Settings, text: "Settings" },
                { icon: HelpCircle, text: "Help" },
                { icon: LogOut, text: "Logout" },
              ].map(({ icon: Icon, text }) => (
                <a
                  key={text}
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-200"
                >
                  <Icon className="mr-3 text-gray-500" size={18} />
                  <span className="text-sm font-medium">{text}</span>
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="flex-1 flex p-6 space-x-6">
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden relative">
          <div className="flex-1 relative bg-gray-900">
            {isMatched ? (
              <video
                ref={remoteVideo}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
                <p className="text-3xl text-white font-semibold">
                  Finding your match...
                </p>
              </div>
            )}
            <div className="absolute top-4 left-4 flex space-x-2">
              <button
                onClick={handleReport}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition duration-200 shadow-md"
              >
                <Flag size={20} />
              </button>
            </div>
          </div>
          <button
            onClick={handleEndCall}
            className="absolute bottom-6 left-6 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transition duration-200 shadow-lg flex items-center justify-center"
          >
            <PhoneOff size={28} />
          </button>
        </div>

        <div className="w-1/3 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-2/5 bg-gray-900 relative">
            <video
              ref={localVideo}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 space-x-2">
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition duration-200 shadow-md ${
                  isVideoOn
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isVideoOn ? (
                  <Video size={22} className="text-white" />
                ) : (
                  <VideoOff size={22} className="text-white" />
                )}
              </button>
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full transition duration-200 shadow-md ${
                  isAudioOn
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isAudioOn ? (
                  <Mic size={22} className="text-white" />
                ) : (
                  <MicOff size={22} className="text-white" />
                )}
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 space-y-4 overflow-y-auto"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[75%] ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    } shadow-md`}
                  >
                    <p className="text-sm leading-snug">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition duration-200 shadow-md"
                >
                  <Send size={22} />
                </button>
                <button
                  onClick={handleSkip}
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-3 transition duration-200 shadow-md"
                >
                  <SkipForward size={22} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
