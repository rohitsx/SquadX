import { useWebRTC } from "@/hooks/useWebRTC";
import RemoteVid from "../videoElement/remotevidElement";
import { useSocket } from "@/context/socketContext";
import { useEffect } from "react";
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
  }, []);

  useEffect(() => {
    resetPc();
  }, [stranger]);

  useEffect(() => {
    if (!stranger || !socket) return;
    sendOffer(socket, stranger.pairId);
    socket.on("message", (m) => {
      handleOffer({
        socket: socket,
        message: m,
        strangerId: stranger.pairId,
        polite: stranger.polite,
      });
    });

    return () => {
      socket.off("message");
    };
  }, [stranger, socket, peerConnection, stream]);

  useEffect(() => {
    if (!socket) return;
    socket.on("strangerLeft", handleCallEnd);

    return () => {
      socket.off("strangerLeft", handleCallEnd);
    };
  }, [socket, stranger]);

  return (
    <>
      <RemoteVid pc={peerConnection} />
      <div className="bg-gradient-to-t from-black to-transparent p-4">
        <p className="text-xl font-semibold text-white">{stranger?.pairName}</p>
      </div>
    </>
  );
}
