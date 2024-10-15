import { useState, useCallback, useRef, useEffect } from "react";
import { Socket } from "socket.io-client";

type HandleOfferProps = {
  socket: Socket;
  message: {
    description?: RTCSessionDescriptionInit;
    candidate?: RTCIceCandidateInit;
  };
  strangerId: string;
  polite: boolean;
};

export const useWebRTC = (stream: MediaStream | null) => {
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const makingOfferRef = useRef(false);
  const ignoreOfferRef = useRef(false);
  const politeRef = useRef(false);

  const start = useCallback(async () => {
    const newPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.mystunserver.tld" }],
    });
    setPeerConnection(newPeerConnection);
  }, []);

  const sendOffer = useCallback(
    (socket: Socket, strangerId: string) => {
      if (!peerConnection || !stream) return;

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      peerConnection.onicecandidate = ({ candidate }) => {
        socket.emit("message", { candidate, to: strangerId });
      };

      peerConnection.onnegotiationneeded = async () => {
        try {
          makingOfferRef.current = true;
          await peerConnection.setLocalDescription();
          socket.emit("message", {
            description: peerConnection.localDescription,
            to: strangerId,
          });
        } catch (err) {
          console.error("error sending offer", err);
        } finally {
          makingOfferRef.current = false;
        }
      };
    },
    [peerConnection, stream],
  );

  const handleOffer = useCallback(
    async ({ socket, message, strangerId, polite }: HandleOfferProps) => {
      if (!peerConnection) return;

      politeRef.current = polite;
      const { description, candidate } = message;

      try {
        if (description) {
          const offerCollision =
            description.type === "offer" &&
            (makingOfferRef.current ||
              peerConnection.signalingState !== "stable");

          ignoreOfferRef.current = !politeRef.current && offerCollision;
          if (ignoreOfferRef.current) return;

          await peerConnection.setRemoteDescription(description);
          if (description.type === "offer") {
            await peerConnection.setLocalDescription();
            socket.emit("message", {
              description: peerConnection.localDescription,
              to: strangerId,
            });
          }
        } else if (candidate) {
          try {
            await peerConnection.addIceCandidate(candidate);
          } catch (err) {
            if (!ignoreOfferRef.current) {
              throw err;
            }
          }
        }
      } catch (err) {
        console.error("error in handle offer", err);
      }
    },
    [peerConnection],
  );

  const resetPc = useCallback(() => {
	if (!peerConnection) return;
	peerConnection.close();
	setPeerConnection(null);
	console.log('resseting pc')
	start();
  }, [peerConnection]);

  useEffect(() => {
    return () => {
      peerConnection?.close();
    };
  }, [peerConnection]);

  return {
    peerConnection,
    start,
    sendOffer,
    handleOffer,
	resetPc
  };
};
