import { useCallback, useEffect, useState } from "react";
import Controls from "../btn/controlBtn";
import useMedia from "@/hooks/useMedia";
import { useSocket } from "@/context/socketContext";
import FriendCall from "./friendCall";
import { useParams } from "react-router-dom";
import { useFriend } from "@/context/friendContext";
import RemoteCall from "./remoteCall";

type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

export default function duoCall() {
  const [stranger, setStranger] = useState<strangerProp | null>(null);
  const { friend } = useFriend();
  const [isMatched, setIsMatched] = useState(false);
  const { stream, closeStream } = useMedia();
  const { duoId } = useParams();
  const socket = useSocket();

  const handlePeer = useCallback(
    (data?: strangerProp) => {
      setIsMatched(!!data);
      console.log("handlePeer", data);
      if (!data) {
        console.log("data reset");
        setStranger(null);
        return;
      }
      setStranger({
        pairId: data.pairId,
        pairName: data.pairName,
        polite: data.polite,
      });
    },
    [socket, friend],
  );

  const handleBeforeUnload = useCallback(() => {
    socket?.emit("pairedclosedtab", stranger?.pairId);
  }, [socket, stranger]);

  useEffect(() => {
    socket?.on("peer", handlePeer);

    if (stranger || !friend || duoId) return;
    socket?.emit("connectPeer", {
      duoSocketId: friend?.pairId,
      duoUsername: friend?.pairName,
    });

    return () => {
      socket?.off("peer", handlePeer);
      socket?.off("duoPeer", handlePeer);
    };
  }, [socket, stranger, friend]);

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

      <FriendCall
        stranger={stranger}
        stream={stream}
        closeStream={closeStream}
      />
    </>
  );
}
