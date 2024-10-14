import { Socket } from "socket.io-client";

type StrangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

export default function useSoloCallUtils(
  setStranger: any,
  socket: Socket,
  setMessages: any,
  setIsMatched: any,
  restpc : () => void
) {
  const handlePeer = (data: StrangerProp) => {
    console.log(data.pairName, "connected");
    setStranger({
      pairId: data.pairId,
      pairName: data.pairName,
      polite: data.polite,
    });
    setIsMatched(true);
  };

  const handleCallEnd = () => {
    setMessages([]);
    setStranger(null);
	restpc();
  };

  const strangerLeft = () => {
    handleCallEnd();
    console.log(socket);
    setIsMatched(false);
  };

  const handleBeforeUnload = (pairId: any) => {
    socket?.emit("pairedclosedtab", pairId);
  };

  return { handlePeer, handleCallEnd, strangerLeft, handleBeforeUnload };
}
