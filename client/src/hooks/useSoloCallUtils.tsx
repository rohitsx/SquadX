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
  resetPc: () => void;
  hasEmittedConnectPeer: React.MutableRefObject<boolean>;
};

export default function useSoloCallUtils({
  setStranger,
  socket,
  setMessages,
  setIsMatched,
  resetPc,
  hasEmittedConnectPeer
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
    resetPc();
    setIsMatched(false);
  }, [setMessages, setStranger, resetPc, setIsMatched]);

  const strangerLeft = useCallback(() => {
    handleCallEnd();
	hasEmittedConnectPeer.current = false;
  }, [handleCallEnd, socket]);

  const handleBeforeUnload = useCallback(
    (pairId: string) => {
      socket?.emit("pairedclosedtab", pairId);
    },
    [socket],
  );

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
    strangerLeft,
    handleBeforeUnload,
    handleChat,
  };
}
