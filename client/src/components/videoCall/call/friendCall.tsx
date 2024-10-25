import ChatBox from "../btn/chatInterface";
import LocalVid from "../videoElement/localVidElement";
import { useCallback, useEffect } from "react";
import { useFriend } from "@/context/friendContext";
import { useStartPage } from "@/context/startPageContext";
import { useNavigate, useParams } from "react-router-dom";
import RemoteCall from "./remoteCall";
import { useSocket } from "@/context/socketContext";

type StrangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

interface FriendCallProp {
  stranger: StrangerProp | null;
  stream: MediaStream | null;
  closeStream: () => void;
}

export default function FriendCall({
  stranger,
  stream,
  closeStream,
}: FriendCallProp) {
  const { friend, setFriend } = useFriend();
  const { setStartPage } = useStartPage();
  const nav = useNavigate();
  const socket = useSocket();
  const { duoId } = useParams();

  const handleCallEnd = useCallback(() => {
    console.log("stranger left");
    closeStream();
    setFriend(null);
    setStartPage("start");
    nav("/");
  }, [closeStream, setFriend, setStartPage, nav]);

  const handleBeforeUnload = useCallback(() => {
    socket?.emit("duoClosedTab", friend?.pairId);
  }, [socket, friend]);

  useEffect(() => {
    if (!socket || !friend || !duoId) return;
    socket.emit("startDuoCall", friend.pairId);
  }, [socket, friend, duoId]);

  useEffect(() => {
    if (!socket || !friend || !duoId) return;

    socket.on("duoClosedTab", handleCallEnd);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.off("duoClosedTab", handleCallEnd);
    };
  }, [socket, friend, handleCallEnd, handleBeforeUnload]);

  return (
    <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
      {friend && (
        <RemoteCall
          stream={stream}
          handleCallEnd={handleCallEnd}
          stranger={friend}
        />
      )}
      <LocalVid stream={stream} />
      <ChatBox strangerId={stranger?.pairId} />
    </div>
  );
}
