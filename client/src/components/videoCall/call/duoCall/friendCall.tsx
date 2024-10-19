import { Socket } from "socket.io-client";
import ChatBox from "../../btn/chatInterface";
import LocalVid from "../localVid";
import RemoteVid from "../remotevid";
import { useCallback, useEffect } from "react";
import { useFriend } from "@/context/friendContext";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useStartPage } from "@/context/startPageContext";
import { useNavigate } from "react-router-dom";

type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

interface messageProp {
  text: string;
  sender: string;
}

interface friendCallprop {
  socket: Socket | null;
  stranger: strangerProp | null;
  messages: messageProp[];
  setMessages: React.Dispatch<React.SetStateAction<messageProp[]>>;
  stream: MediaStream | null;
  closeStream: () => void;
}

export default function FriendCall({
  socket,
  stranger,
  messages,
  setMessages,
  stream,
  closeStream,
}: friendCallprop) {
  const { peerConnection, start, sendOffer, handleOffer } = useWebRTC(stream);
  const { friend, setFriend } = useFriend();
  const { setStartPage } = useStartPage();
  const nav = useNavigate();

  const handelCallEnd = useCallback(() => {
    closeStream();
    setMessages([]);
    setFriend(null);
    setStartPage("start");
    nav("/");
  }, [stream, friend, messages]);

  const handelBeforeUnload = useCallback(() => {
    socket?.emit("pairedclosedtab", friend?.socketId);
  }, [socket, friend]);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (!socket || !friend) return;
    socket.emit("startDuoCall", friend.socketId);
  }, [socket, friend]);

  useEffect(() => {
    if (!socket || !friend) return;

    socket.on("strangerLeft", handelCallEnd);
    window.addEventListener("beforeunload", handelBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handelBeforeUnload);
      socket.off("strangerLeft", handelCallEnd);
    };
  }, [socket, friend, stream]);

  useEffect(() => {
    if (!peerConnection || !socket || !friend) return;
    sendOffer(socket, friend.socketId);

    const checkFriend = setTimeout(() => {
      handelCallEnd();
    }, 1000);

    socket.on("message", (m) => {
      clearTimeout(checkFriend);
      handleOffer({
        socket: socket,
        message: m,
        strangerId: friend.socketId,
        polite: friend.polite,
      });
    });

    return () => {
      socket.off("message");
      clearTimeout(checkFriend);
    };
  }, [peerConnection, socket, stream]);

  return (
    <>
      <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
        <RemoteVid pc={peerConnection} />
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
