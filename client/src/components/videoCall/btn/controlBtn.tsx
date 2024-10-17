import { Flag, PhoneOff, SkipForward } from "lucide-react";
import { Socket } from "socket.io-client";
import { FormEvent, useCallback } from "react";
import { useStartPage } from "@/context/startPageContext";

interface Message {
  text: string;
  sender: string;
}

interface ChatBoxProps {
  setMessages: (value: Message[]) => void;
  strangerId: string | undefined;
  socket: Socket | null;
  endCall: () => void;
  closeStream: () => void;
}

export default function Controls({
  strangerId,
  socket,
  endCall,
  closeStream,
}: ChatBoxProps) {
  const { setStartPage } = useStartPage();

  const handleSkip = useCallback(() => {
    endCall();
    socket?.emit("skip", strangerId);
  }, [socket, strangerId]);

  const handleEndCall = useCallback(() => {
    socket?.emit("pairedclosedtab", strangerId);
    endCall();
    setStartPage(false);
    closeStream();
  }, [socket, strangerId]);

  const handleReport = useCallback(() => {
    console.log("added report");
  }, []);

  return (
    <>
      <div className="absolute top-4 right-4">
        <button
          onClick={handleReport}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition duration-200 shadow-md"
        >
          <Flag size={20} />
        </button>
      </div>

      <div className="absolute bottom-4 right-4 flex space-x-4">
        <button
          onClick={handleEndCall}
          className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transition duration-200 shadow-lg flex items-center justify-center"
        >
          <PhoneOff size={28} />
        </button>
        <button
          onClick={handleSkip}
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-3 transition duration-200 shadow-md"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </>
  );
}
