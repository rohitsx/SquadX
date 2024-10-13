import { Flag, PhoneOff, SkipForward } from "lucide-react";
import { Socket } from "socket.io-client";
import Media from "../utils/MediaStream";
import { FormEvent } from "react";
import { useStartPage } from "@/context/startPageContext";

interface Message {
  text: string;
  sender: string;
}

interface ChatBoxProps {
  setIsMatched: (value: boolean) => void;
  setMessages: (value: Message[]) => void;
  strangerId: string | undefined;
  socket: Socket | null;
  endCall: () => void;
}

export default function Controls({
  setIsMatched,
  setMessages,
  strangerId,
  socket,
  endCall,
}: ChatBoxProps) {
  const { setStartPage } =  useStartPage();
  const handleSkip = () => {
    setIsMatched(false);
    setMessages([]);
    socket && socket.emit("skip", strangerId);
  };

  const handleEndCall = async (e: FormEvent) => {
	e.preventDefault();
    Media.Close();
    socket && socket.emit("pairedclosedtab", strangerId);
    endCall();
    setStartPage(false);
  };
  const handleReport = () => {
    console.log();
  };

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
