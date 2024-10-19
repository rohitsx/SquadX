import { Socket } from "socket.io-client";
import { Dispatch, SetStateAction, useCallback } from "react";

type StrangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

type MessageProp = {
  text: string;
  sender: string;
};

type UseSoloCallUtilsProps = {
  setStranger: Dispatch<SetStateAction<StrangerProp | null>>;
  socket: Socket | null;
  setMessages: Dispatch<SetStateAction<MessageProp[]>>;
  setIsMatched: Dispatch<SetStateAction<boolean>>;
};

export default function useSoloCallUtils({
  setStranger,
  socket,
  setMessages,
  setIsMatched,
}: UseSoloCallUtilsProps) {
  const handlePeer = useCallback(
    (data: StrangerProp) => {
      console.log(data.pairName, "connected");
      setStranger(data);
      setIsMatched(true);
    },
    [setStranger, setIsMatched],
  );

  const handleCallEnd = useCallback(() => {
    setMessages([]);
    setStranger(null);
    setIsMatched(false);
  }, [setMessages, setStranger, setIsMatched]);

  const handleChat = useCallback(
    (m: string) => {
      console.log("chat", socket?.id);
      const chat = m.trim();
      const newMessage: MessageProp = {
        text: chat,
        sender: "stranger",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [socket, setMessages],
  );

  return {
    handlePeer,
    handleCallEnd,
    handleChat,
  };
}
