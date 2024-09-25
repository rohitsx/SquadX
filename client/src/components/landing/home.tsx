import { SocketProvider } from "@/context/socketContext";
import { validateToken } from "@/lib/validateToken";
import VideoCall from "../webrtc/webRtc";

export default function Home() {
  validateToken();


  return (<>
    <SocketProvider>
          <VideoCall/>
    </SocketProvider>
  </>)
}


