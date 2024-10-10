import { useEffect, useRef } from "react";

type RemoteVidProp = {
  pc: RTCPeerConnection | null;
};

export default function RemoteVid({ pc }: RemoteVidProp): JSX.Element {
  const vid = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (!pc) return;
    pc.ontrack = (event) => {
      if (vid.current && event.streams && event.streams[0]) {
        vid.current.srcObject = event.streams[0];
        console.log("event stream", event.streams);
      }
    };
  }, [pc]);

  return (
    <video
      ref={vid}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover"
    />
  );
}
