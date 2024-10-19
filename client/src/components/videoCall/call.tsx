import { useWebRTC } from "@/hooks/useWebRTC";
import RemoteVid from "./call/remotevid";
import { useSocket } from "@/context/socketContext";
import { useCallback, useEffect } from "react";
type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

export interface remoteCallProps {
  stream: MediaStream | null;
  handleCallEnd: () => void;
  stranger: strangerProp | null;
}

export default function RemoteCall({
  stream,
  handleCallEnd,
  stranger,
}: remoteCallProps) {
  const { peerConnection, start, sendOffer, handleOffer, resetPc } =
    useWebRTC(stream);
  const socket = useSocket();

  useEffect(() => {
    start();
	console.log("working")
  }, []);

  useEffect(() => {
    if (!peerConnection || !stranger || !socket) return;
    console.log("working");
    sendOffer(socket, stranger.pairId);
    socket.on("message", (m) => {
      handleOffer({
        socket: socket,
        message: m,
        strangerId: stranger.pairId,
        polite: stranger.polite,
      });
    });
  }, [peerConnection, stream, stranger]);

  const strangerLeft = useCallback(() => {
    handleCallEnd();
    resetPc();
  }, []);
  const handleBeforeUnload = useCallback(() => {
	socket?.emit("pairedclosedtab", stranger?.pairId);
  }, [socket])

  useEffect(() => {
    if (!socket) return;
	socket.on('strangerLeft', strangerLeft);
	window.addEventListener("beforeunload", handleBeforeUnload);

	return () => {
		socket.off('strangerLeft', strangerLeft);
		window.removeEventListener("beforeunload", handleBeforeUnload);
	};

  }, [socket, stranger]);

  return <RemoteVid pc={peerConnection} />;
}
