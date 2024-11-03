import ChatBox from "../btn/chatInterface";
import LocalVid from "../videoElement/localVidElement";
import { useCallback, useEffect } from "react";
import { useFriend } from "@/context/friendContext";
import { useStartPage } from "@/context/startPageContext";
import { useNavigate, useParams } from "react-router-dom";
import RemoteCall from "./remoteCall";
import { useSocket } from "@/context/socketContext";
import axios from "axios";

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

  const startDuoCall = useCallback(async () => {
    await axios
      .post(import.meta.env.VITE_API_URL + "/getActiveDuoCall", {
        friendName: friend?.pairName,
        socketId: friend?.pairId,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        res.data === "success"
          ? socket?.emit("startDuoCall", friend?.pairId)
          : handleCallEnd();
      });
  }, [socket, friend, duoId, stream]);

  const handleCallEnd = useCallback(() => {
    closeStream();
    setFriend(null);
    setStartPage("start");
    nav("/");
  }, [stream]);

  const handleBeforeUnload = useCallback(() => {
    socket?.emit("duoClosedTab", friend?.pairId);
  }, [socket, friend]);

  useEffect(() => {
    if (!socket || !friend || !duoId || !stream) return;
    startDuoCall();
  }, [socket, friend, duoId, stream]);

  useEffect(() => {
    if (!socket || !stream) return;
    socket.on("duoClosedTab", handleCallEnd);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      socket?.off("duoClosedTab", handleCallEnd);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket, stream]);

  return (
    <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
      {friend && (
        <RemoteCall
          stream={stream}
          handleCallEnd={handleCallEnd}
          stranger={friend}
          userType="friends"
        />
      )}
      <LocalVid stream={stream} />
      <ChatBox strangerId={stranger?.pairId} />
    </div>
  );
}
