import { useCallback, useEffect, useState } from "react";
import LocalVid from "./localVid";
import ChatBox from "../btn/chatInterface";
import Controls from "../btn/controlBtn";
import useMedia from "@/hooks/useMedia";
import { useSocket } from "@/context/socketContext";
import RemoteCall from "../call";

type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

interface Message {
  text: string;
  sender: string;
}

export default function SoloCall() {
  const [stranger, setStranger] = useState<strangerProp | null>(null);
  const [isMatched, setIsMatched] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { stream, closeStream } = useMedia();
  const socket = useSocket();

  const handlePeer = useCallback(
    (data: strangerProp) => {
      console.log(data.pairName, "connected");
      setStranger(data);
      setIsMatched(true);
    },
    [stranger],
  );

  const handleCallEnd = useCallback(() => {
    console.log("handleCallEnd running");
    setMessages([]);
    setStranger(null);
    setIsMatched(false);
  }, []);
  const handleBeforeUnload = useCallback(() => {
    socket?.emit("pairedclosedtab", stranger?.pairId);
  }, [socket]);

  useEffect(() => {
    if (!socket || stranger) return;

    console.log("send peer request");
    socket.emit("connectPeer");
    socket.on("peer", handlePeer);

    return () => {
      socket.off("peer", handlePeer);
    };
  }, [socket, stranger]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket, stranger]);

  return (
    <>
      <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="flex-1 relative bg-gray-900">
          {isMatched ? (
            <>
              <RemoteCall
                stream={stream}
                handleCallEnd={handleCallEnd}
                stranger={stranger}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-xl font-semibold text-white">
                  {stranger?.pairName}
                </p>
              </div>
              <Controls
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
