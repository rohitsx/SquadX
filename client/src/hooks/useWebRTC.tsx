import { useState, useCallback, useRef } from "react";
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

type useWebRTCProp = {
  stream: MediaStream | null;
  signalingMessage: "messageFriend" | "messageStranger" | "messageDuo";
};

export const useWebRTC = ({ stream, signalingMessage }: useWebRTCProp) => {
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const makingOfferRef = useRef(false);
  const ignoreOfferRef = useRef(false);
  const politeRef = useRef(false);
  const iceCandidatesQueue = useRef<RTCIceCandidateInit[]>([]);

  const start = useCallback(async () => {
    if (peerConnection?.connectionState === "connected") peerConnection.close();

    const newPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.mystunserver.tld" }],
    });
    setPeerConnection(newPeerConnection);
  }, [peerConnection]);

  const sendOffer = useCallback(
    (socket: Socket, strangerId: string) => {
      if (!peerConnection || !stream) return;

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      peerConnection.onicecandidate = ({ candidate }) => {
        socket.emit("message", {
          candidate,
          to: strangerId,
          emitValue: signalingMessage,
        });
      };

      peerConnection.onnegotiationneeded = async () => {
        try {
          makingOfferRef.current = true;
          await peerConnection.setLocalDescription();
          socket.emit("message", {
            description: peerConnection.localDescription,
            to: strangerId,
            emitValue: signalingMessage,
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

  const processIceCandidateQueue = useCallback(async () => {
    if (!peerConnection) return;

    while (iceCandidatesQueue.current.length) {
      const candidate = iceCandidatesQueue.current.shift();
      try {
        await peerConnection.addIceCandidate(candidate!);
      } catch (err) {
        console.error("Error adding queued ICE candidate:", err);
      }
    }
  }, [peerConnection]);
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

          await processIceCandidateQueue();

          if (description.type === "offer") {
            await peerConnection.setLocalDescription();
            socket.emit("message", {
              description: peerConnection.localDescription,
              to: strangerId,
              emitValue: signalingMessage,
            });
          }
        } else if (candidate) {
          try {
            if (peerConnection.remoteDescription) {
              await peerConnection.addIceCandidate(candidate);
            } else {
              iceCandidatesQueue.current.push(candidate);
            }
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
    [peerConnection, processIceCandidateQueue],
  );

  const resetPc = useCallback(() => {
    if (!peerConnection) return;
    peerConnection.close();
    setPeerConnection(null);
    iceCandidatesQueue.current = [];
    start();

    return () => {
      peerConnection.close();
      iceCandidatesQueue.current = [];
    };
  }, [peerConnection]);

  return {
    peerConnection,
    start,
    sendOffer,
    handleOffer,
    resetPc,
  };
};
