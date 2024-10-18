import { Socket } from "socket.io-client";
import ChatBox from "../../btn/chatInterface";
import LocalVid from "../localVid";
import RemoteVid from "../remotevid";
import { useWebRTC } from "@/hooks/useWebRTCForDuo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

interface friendCallprop {
  socket: Socket | null;
  stranger: strangerProp | null;
  messages: messageProp[];
  setMessages: React.Dispatch<React.SetStateAction<messageProp[]>>;
  stream: MediaStream | null;
}

export default function FriendCall({
  socket,
  stranger,
  messages,
  setMessages,
  stream,
}: friendCallprop) {
  const { peerConnection, start, sendOffer, handleOffer } = useWebRTC(stream);
  const { friend } = useFriend();
  const nav = useNavigate();

  useEffect(() => {
    if (!socket || !friend) return;
    socket.emit("startDuoCall", friend.socketId);
  }, [socket, friend]);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (!socket || !friend) return;
    const handelCallEnd = () => {
      nav("/");
      window.location.reload();
    };
    const handelBeforeUnload = () =>
      socket.emit("pairedclosedtab", friend.socketId);

    socket.on("strangerLeft", handelCallEnd);
    window.addEventListener("beforeunload", handelBeforeUnload);

    return () => {
      socket.off("strangerLeft", handelCallEnd);
      window.removeEventListener("beforeunload", handelBeforeUnload);
    };
  }, [socket, friend]);

  useEffect(() => {
    if (!peerConnection || !socket || !friend) return;

	console.log('sending offer', friend.socketId)
    sendOffer(socket, friend.socketId);

    socket.on("messages", (m) =>
      handleOffer({
        socket: socket,
        message: m,
        strangerId: friend.socketId,
        polite: friend.polite,
      }),
    );
  }, [peerConnection, socket]);

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
