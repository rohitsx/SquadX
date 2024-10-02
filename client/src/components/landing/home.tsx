import { validateToken } from "@/lib/validateToken";
import VideoCall from "../webrtc/webRtc";

export default function Home() {
  validateToken();

  return (
    <>
      <VideoCall />
    </>
  );
}
