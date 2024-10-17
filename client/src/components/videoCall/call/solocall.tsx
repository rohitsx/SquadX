import { useCallback, useEffect, useState } from "react";
import LocalVid from "./localVid";
import RemoteVid from "./remotevid";
import ChatBox from "../btn/chatInterface";
import Controls from "../btn/controlBtn";
import { useWebRTC } from "@/hooks/useWebRTC";
import useMedia from "@/hooks/useMedia";
import useSoloCallUtils from "@/hooks/useSoloCallUtils";
import useSocket from "@/hooks/useSocket";

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
  const { peerConnection, start, sendOffer, handleOffer, resetPc } =
    useWebRTC(stream);
  const socket = useSocket();
  const { handlePeer, handleCallEnd, handleChat } = useSoloCallUtils({
    setStranger,
    socket,
    setMessages,
    setIsMatched,
    resetPc,
  });

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (!socket || stranger) return;

    socket.emit("connectPeer");
    socket.on("peer", handlePeer);
    return () => {
      socket.off("peer", handlePeer);
    };
  }, [socket, stranger]);

  useEffect(() => {
    if (!socket) return;

    socket.on("strangerLeft", handleCallEnd);

	const handleBeforeUnload = () =>
      socket?.emit("pairedclosedtab", stranger?.pairId);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("strangerLeft", handleCallEnd);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket, stranger]);

  useEffect(() => {
    if (!peerConnection || !socket || !stranger) return;
    sendOffer(socket, stranger.pairId);

    socket.on("message", (m) =>
      handleOffer({
        socket: socket,
        message: m,
        strangerId: stranger.pairId,
        polite: stranger.polite,
      }),
    );

    socket.on("chat", handleChat);

    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.off("peer");
    };
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
