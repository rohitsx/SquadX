import { validateToken } from "@/utils/validateToken";
import VideoCall from "./videoCall";

export default function Home() {
  validateToken();

  return (
    <>
      <VideoCall />
    </>
  );
}
