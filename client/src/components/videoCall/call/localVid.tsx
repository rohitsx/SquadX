import Media from "../utils/MediaStream";
import { useEffect, useRef } from "react";

type LocalVidProps = {
  stream: MediaStream | null;
};

export default function LocalVid({ stream }: LocalVidProps): JSX.Element {
  const vid = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (vid.current && stream) {
      vid.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <video
        ref={vid}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      <button onClick={() => Media.Close()}>CloseStream</button>
    </>
  );
}
