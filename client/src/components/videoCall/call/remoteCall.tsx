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
  userType: "friend" | "stranger" | "duo";
}

export default function RemoteCall({
  stream,
  handleCallEnd,
  stranger,
  userType,
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
  const hasSentOffer = useRef(false);
  const [sendOfferCheck, setSendOfferCheck] = useState(false);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (
      !stranger ||
      !socket ||
      !peerConnection ||
      !stream ||
      hasSentOffer.current ||
      (userType === "stranger" && friend && peerState.friend === "disconnected")
    )
      return;

    console.log(
      localStorage.getItem("username"),
      "sent offer to",
      stranger.pairName,
      stranger.polite,
    );
    sendOffer(socket, stranger.pairId);
    hasSentOffer.current = true;
    setSendOfferCheck(true);
  }, [
    stranger,
    socket,
    peerConnection,
    stream,
    peerState,
    friend,
    userType,
    sendOfferCheck,
  ]);

  useEffect(() => {
    sendOfferCheck &&
      socket &&
      stranger &&
      socket.on(signalingMessage, (m) => {
        if (m.description?.type === "offer")
          console.log(
            localStorage.getItem("username"),
            "recived offer from",
            stranger.pairName,
            stranger.polite,
          );
        if (m.description?.type === "answer")
          console.log(
            localStorage.getItem("username"),
            "recived answer from",
            stranger.pairName,
            stranger.polite,
          );
        handleOffer({
          socket: socket,
          message: m,
          strangerId: stranger.pairId,
          polite: stranger.polite,
        });
      });
  }, [stranger, socket, sendOfferCheck]);

  useEffect(() => {
    if (!socket || !stranger) return;
    socket.on("strangerLeft", handleCallEnd);

    return () => {
      socket.off("strangerLeft", handleCallEnd);
      socket.off(signalingMessage);
    };
  }, [socket, stranger, peerState, peerConnection]);

  useEffect(() => {
    const connectionStateChangeHandler = () => {
      if (peerConnection?.connectionState === "connected") {
        userType === "stranger"
          ? updatePeerState("stranger", "connected")
          : updatePeerState("friend", "connected");
      }
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
