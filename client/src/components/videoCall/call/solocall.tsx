import { useEffect, useMemo, useState } from "react";
import LocalVid from "./localVid";
import RemoteVid from "./remotevid";
import ChatBox from "../btn/chatInterface";
import Controls from "../btn/controlBtn";
import { io } from "socket.io-client";
import { useWebRTC } from "@/hooks/useWebRTC";
import useMedia from "@/hooks/useMedia";
import useSoloCallUtils from "@/hooks/useSoloCallUtils";

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
  const [stranger, setStranger] = useState<strangerProp | null>(null);
  const [isMatched, setIsMatched] = useState(false);
  const [messages, setMessages] = useState<messageProp[]>([]);
  const { stream, closeStream } = useMedia();
  const { peerConnection, start, sendOffer, handleOffer, restPc } = useWebRTC(stream);
  const socket = useMemo(() => {
    return io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
      transports: ["websocket"],
      auth: { username: localStorage.getItem("username") },
    });
  }, []);

  const { handlePeer, handleCallEnd, strangerLeft, handleBeforeUnload } =
    useSoloCallUtils(
      setStranger,
      socket,
      setMessages,
      setIsMatched,
	  restPc
    );

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (!socket) return;

    console.log(socket, isMatched);
    !isMatched && socket.emit("connectPeer");
    socket.on("peer", handlePeer);
    socket.on("strangerLeft", strangerLeft);
    window.addEventListener("beforeunload", () => handleBeforeUnload(stranger?.pairId));

    return () => {
      socket.off("peer", handlePeer);
      socket.off("strangerLeft", strangerLeft);
      window.removeEventListener("beforeunload",() => handleBeforeUnload(stranger?.pairId));
    };
  }, [socket, isMatched]);

  useEffect(() => {
    if (peerConnection && socket && stranger) {
      sendOffer(socket, stranger.pairId);

      socket.on("message", (m) =>
        handleOffer({
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
  }, [peerConnection, socket, stranger]);

  return (
    <>
      <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="flex-1 relative bg-gray-900">
          {isMatched ? (
            <>
              <RemoteVid pc={peerConnection} />
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
                endCall={handleCallEnd}
				closeStream={closeStream}
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

