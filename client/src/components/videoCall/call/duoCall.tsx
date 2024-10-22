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

    const handlePeer = useCallback((data?: strangerProp) => {
    console.log(data?.pairName, "added or removed");
    setStranger(data || null);
    setIsMatched(!!data);
  }, []);

  useEffect(() => {
	  if(!socket || !friend || !duoId) return;
//	  socket.emit('connectPeer', friend);

  }, [friend])

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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-xl font-semibold text-white">
                  {stranger?.pairName}
                </p>
              </div>
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
