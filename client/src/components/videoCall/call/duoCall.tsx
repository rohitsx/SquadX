import { useCallback, useEffect, useState } from "react";
import RemoteVid from "../videoElement/remotevid";
import Controls from "../btn/controlBtn";
import { useWebRTC } from "@/hooks/useWebRTC";
import useMedia from "@/hooks/useMedia";
import { useSocket } from "@/context/socketContext";
import FriendCall from "./duoCall/friendCall";
import { useParams } from "react-router-dom";
import { useFriend } from "@/context/friendContext";

type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

interface messageProp {
  text: string;
  sender: string;
}

export default function duoCall() {
  const [stranger, setStranger] = useState<strangerProp | null>(null);
  const [isMatched, setIsMatched] = useState(false);
  const [messages, setMessages] = useState<messageProp[]>([]);
  const { stream, closeStream } = useMedia();
  const { peerConnection, start, sendOffer, handleOffer, resetPc } =
    useWebRTC(stream);
  const socket = useSocket();
  const { duoId } = useParams();
  const { friend } = useFriend();

  useEffect(() => {
    start();
  }, []);

  const handlePeer = useCallback(
    (data: strangerProp) => {
      console.log(data.pairName, "connected");
      setStranger(data);
      setIsMatched(true);
      socket?.emit("sendDuoStranger", { stranger: data, to: friend?.socketId });
    },
    [socket, friend],
  );

  const handleCallEnd = useCallback(() => {
    setMessages([]);
    setStranger(null);
    resetPc();
    setIsMatched(false);
  }, [stranger, messages, friend]);

  const handleChat = useCallback(
    (m: string) => {
      console.log("chat", socket?.id);
      const chat = m.trim();
      const newMessage: messageProp = {
        text: chat,
        sender: "stranger",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [socket, messages],
  );

  useEffect(() => {
    if (!socket || stranger) return;

    if (!duoId && friend) socket.emit("connectPeer");
    socket.on("peer", handlePeer);
    return () => {
      socket.off("peer", handlePeer);
    };
  }, [socket, stranger, duoId, friend]);

  useEffect(() => {
    if (!socket || !stranger) return;

    socket.on("strangerLeft", handleCallEnd);

    const handleBeforeUnload = () =>
      socket?.emit("pairedclosedtab", stranger?.pairId);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.off("strangerLeft", handleCallEnd);
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
                strangerId={stranger?.pairId}
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

      <FriendCall
        socket={socket}
        stranger={stranger}
        messages={messages}
        setMessages={setMessages}
        stream={stream}
        closeStream={closeStream}
      />
    </>
  );
}
