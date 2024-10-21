import { useCallback, useEffect, useState } from "react";
import LocalVid from "../videoElement/localVid"
import ChatBox from "../btn/chatInterface";
import Controls from "../btn/controlBtn";
import useMedia from "@/hooks/useMedia";
import { useSocket } from "@/context/socketContext";
import RemoteCall from "./remoteCall";

type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

export default function SoloCall() {
  const [stranger, setStranger] = useState<strangerProp | null>(null);
  const [duo, setDuo] = useState<strangerProp | null>(null);
  const [isMatched, setIsMatched] = useState(false);
  const { stream, closeStream } = useMedia();
  const socket = useSocket();

  const handlePeer = useCallback((data?: strangerProp) => {
    console.log(data?.pairName, "added or removed");
    setStranger(data || null);
    setIsMatched(!!data);
  }, []);

  const handleDuo = useCallback((data?: strangerProp) => {
    console.log(data?.pairName, "added or removed");
    setDuo(data || null);
    setIsMatched(!!data);
  }, []);

  const handleBeforeUnload = useCallback(() => {
    socket?.emit("pairedclosedtab", stranger?.pairId);
  }, [socket, stranger]);

  useEffect(() => {
    if (!socket || stranger) return;
    socket.emit("connectPeer");
    socket.on("peer", handlePeer);
    socket.on("duo", handleDuo);

    return () => {
      socket.off("peer", handlePeer);
    };
  }, [socket, stranger]);

  useEffect(() => {
    if (!socket) return;
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
              {duo && (
                <RemoteCall
                  stream={stream}
                  handleCallEnd={handleDuo}
                  stranger={duo}
                />
              )}
              <RemoteCall
                stream={stream}
                handleCallEnd={handlePeer}
                stranger={stranger}
              />
              <Controls
                strangerId={stranger?.pairId}
                endCall={handlePeer}
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
        <ChatBox strangerId={stranger?.pairId} />
      </div>
    </>
  );
}
