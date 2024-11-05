import { useWebRTC } from "@/hooks/useWebRTC";
import RemoteVid from "../videoElement/remotevidElement";
import { useSocket } from "@/context/socketContext";
import { useEffect, useMemo } from "react";
import { usePeerState } from "@/context/peerStateContext";
type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

export interface remoteCallProps {
  stream: MediaStream | null;
  handleCallEnd: () => void;
  stranger: strangerProp | null;
  userType: "friend" | "duo" | "stranger";
}

export default function RemoteCall({
  stream,
  handleCallEnd,
  stranger,
  userType,
}: remoteCallProps) {
  const signalingMessage = useMemo(() => {
    if (userType === "friend") return "messageFriend";
    if (userType === "stranger") return "messageStranger";
    if (userType === "duo") return "messageDuo";
    return "messageStranger";
  }, [userType]);
  const { peerConnection, start, sendOffer, handleOffer, resetPc } = useWebRTC({
    stream,
    signalingMessage,
  });
  const socket = useSocket();
  const { peerState, updatePeerState } = usePeerState();

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    resetPc();
  }, [stranger]);

  useEffect(() => {
    if (!stranger || !socket) return;
    sendOffer(socket, stranger.pairId);
	console.log('username', stranger.pairName, 'polite', stranger.polite)
    socket.on(signalingMessage, (m) => {
      handleOffer({
        socket: socket,
        message: m,
        strangerId: stranger.pairId,
        polite: stranger.polite,
      });
    });

    return () => {
      socket.off(signalingMessage);
	  socket.off('startDuoSignaling')
    };
  }, [stranger, socket, peerConnection, stream]);

  useEffect(() => {
    if (!socket) return;
    socket.on("strangerLeft", handleCallEnd);

    return () => {
      socket.off("strangerLeft", handleCallEnd);
    };
  }, [socket, stranger]);

  useEffect(() => {
    peerConnection?.addEventListener("connectionstatechange", () => {
      if (peerConnection?.connectionState !== "connected") return;
      switch (userType) {
        case "stranger":
          updatePeerState("stranger", "connected");
          break;
        case "friend":
          updatePeerState("friend", "connected");
          break;
        case "duo":
          updatePeerState("duo", "connected");
          break;
        default:
          break;
      }
    });
  }, [peerConnection]);

  useEffect(() => {
  }, [peerState]);

  return (
    <>
      <div>
        <RemoteVid pc={peerConnection} />
        <div className="bg-gradient-to-t from-black to-transparent p-4">
          <p className="text-xl font-semibold text-white">
            {stranger?.pairName}
          </p>
        </div>
      </div>
    </>
  );
}
