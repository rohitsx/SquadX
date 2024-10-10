import { useEffect, useMemo, useState } from "react";
import LocalVid from "./call/localVid";
import RemoteVid from "./call/remotevid";
import Media from "./utils/MediaStream";
import { WebRTC } from "./utils/webRTC";
import useSocket from "@/hooks/useSocket";

type strangerProp = {
  pairId: string;
  pairName: string;
  polite: boolean;
};

export default function Call() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [stranger, setStranger] = useState<strangerProp | null>(null);
  const webRTC = new WebRTC();
  const socket = useSocket();
  const pc = useMemo(() => webRTC.PeerConnection, [stream, socket, stranger]);


  async function media() {
    await webRTC.start(); //start the stream too from Media class
    setStream(Media.Stream);
  }

  function handelPeer(data: strangerProp) {
    setStranger({
      pairId: data.pairId,
      pairName: data.pairName,
      polite: data.polite,
    });
  }

  function handelCallEnd() {
    setStranger(null);
    console.log(pc);
  }

  useEffect(() => {
    media();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit("connectPeer");
    socket.on("peer", handelPeer);
    socket.on("strangerLeft", handelCallEnd);

    return () => {
      socket.off("peer", handelPeer);
      socket.off("strangerLeft", handelCallEnd);
    };
  }, [socket]);

  useEffect(() => {
    if (pc && socket && stranger) {
      console.log(stranger.pairName);
      webRTC.sendOffer(socket, stranger.pairId);

      socket.on("message", (m) =>
        webRTC.handelOffer({
          socket: socket,
          message: m,
          strangerId: stranger.pairId,
		  polite: stranger.polite
        }),
      );
    }
  }, [pc, socket, stranger]);

  return (
    <>
      <LocalVid stream={stream} />
      <RemoteVid pc={pc} />
    </>
  );
}
