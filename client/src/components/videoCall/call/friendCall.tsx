import ChatBox from "../btn/chatInterface";
import LocalVid from "../videoElement/localVidElement";
import { useCallback, useEffect } from "react";
import { useFriend } from "@/context/friendContext";
import { useStartPage } from "@/context/startPageContext";
import { useNavigate, useParams } from "react-router-dom";
import RemoteCall from "./remoteCall";
import { useSocket } from "@/context/socketContext";

type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

interface friendCallprop {
  stranger: strangerProp | null;
  stream: MediaStream | null;
  closeStream: () => void;
}

export default function FriendCall({
  stranger,
  stream,
  closeStream,
}: friendCallprop) {
  const { friend, setFriend } = useFriend();
  const { setStartPage } = useStartPage();
  const nav = useNavigate();
  const socket = useSocket();
  const { duoId } = useParams();

  const handelCallEnd = useCallback(() => {
    console.log("stranger left");
    closeStream();
    setFriend(null);
    setStartPage("start");
    nav("/");
  }, [stream]);

  const handelBeforeUnload = useCallback(() => {
    socket?.emit("duoClosedTab", friend?.pairId);
  }, [socket, friend]);

  useEffect(() => {
    if (!socket || !friend || !duoId) return;
    socket.emit("startDuoCall", friend.pairId);
  }, [socket, friend, duoId]);

  useEffect(() => {
    if (!stream || !socket) return;
    //    const checkFriend = setTimeout(() => {
    //    handelCallEnd();
    // }, 5000);

    return () => {
      // socket.off("duoLive");
      //clearTimeout(checkFriend);
    };
  }, [socket, stream, duoId]);

  useEffect(() => {
    socket?.on("duoLive", () => console.log("duoLive"));
  }, [socket]);

  useEffect(() => {
    if (!socket || !friend) return;

    socket.on("duoClosedTab", handelCallEnd);

    window.addEventListener("beforeunload", handelBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handelBeforeUnload);
      socket.off("duoClosedTab", handelCallEnd);
    };
  }, [socket, friend, stream]);

  return (
    <>
      <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
        <RemoteCall
          stream={stream}
          handleCallEnd={handelCallEnd}
          stranger={friend}
        />
        <LocalVid stream={stream} />
        <ChatBox strangerId={stranger?.pairId} />
      </div>
    </>
  );
}
