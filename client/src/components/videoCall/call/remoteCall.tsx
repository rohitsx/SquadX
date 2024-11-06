import { useWebRTC } from "@/hooks/useWebRTC";
import RemoteVid from "../videoElement/remotevidElement";
import { useSocket } from "@/context/socketContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePeerState } from "@/context/peerStateContext";
import { useFriend } from "@/context/friendContext";
type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

export interface remoteCallProps {
  stream: MediaStream | null;
  handleCallEnd: () => void;
  stranger: strangerProp | null;
  userType: "friend" | "stranger";
  duo?: boolean;
}

export default function RemoteCall({
  stream,
  handleCallEnd,
  stranger,
  userType,
  duo,
}: remoteCallProps) {
  const signalingMessage = useMemo(
    () => (userType === "friend" ? "messageFriend" : "messageStranger"),
    [userType],
  );
  const { peerConnection, start, sendOffer, handleOffer } = useWebRTC({
    stream,
    signalingMessage,
  });
  const socket = useSocket();
  const { peerState, updatePeerState } = usePeerState();
  const { friend } = useFriend();

  useEffect(() => {
    start();
  }, []);
  const hasSentOffer = useRef(false);

  useEffect(() => {
    if (
      !stranger ||
      !socket ||
      (userType === "stranger" && friend && peerState.friend !== "connected") ||
      (duo && peerState.stranger !== "connected")
    ) {
      console.log("Returning early from useEffect");
      return;
    }
    if (!hasSentOffer.current) {
      console.log("sendOffer");
      sendOffer(socket, stranger.pairId);
    }
  }, [stranger, socket, peerConnection, stream, peerState]);

  useEffect(() => {
    if (!socket || !stranger) return;
    socket.on("strangerLeft", handleCallEnd);
    socket.on(signalingMessage, (m) => {
      console.log("Handling offer message in useEffect");
      handleOffer({
        socket: socket,
        message: m,
        strangerId: stranger.pairId,
        polite: stranger.polite,
      });
    });

    return () => {
      socket.off("strangerLeft", handleCallEnd);
      socket.off(signalingMessage);
    };
  }, [socket, stranger, peerState, peerConnection]);

  useEffect(() => {
    const connectionStateChangeHandler = () => {
      if (peerConnection?.connectionState !== "connected") return;
      hasSentOffer.current = true;
      userType === "stranger"
        ? updatePeerState("stranger", "connected")
        : updatePeerState("friend", "connected");
    };

    peerConnection?.addEventListener(
      "connectionstatechange",
      connectionStateChangeHandler,
    );

    return () => {
      peerConnection?.removeEventListener(
        "connectionstatechange",
        connectionStateChangeHandler,
      );
    };
  }, [peerConnection]);

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
