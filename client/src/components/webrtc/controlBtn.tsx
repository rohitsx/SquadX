import { Flag, PhoneOff, SkipForward } from "lucide-react";
import { Socket } from "socket.io-client";

interface Message {
  text: string;
  sender: string;
}

interface ChatBoxProps {
  setIsMatched: (value: boolean) => void;
  setMessages: (value: Message[]) => void;
  strangerId: string | null;
  socket: Socket | null;
}

export default function Controls({
  setIsMatched,
  setMessages,
  strangerId,
  socket,
}: ChatBoxProps) {
  const handleSkip = () => {
    setIsMatched(false);
    setMessages([]);
    socket && socket.emit("skip", strangerId);
  };

  const handleEndCall = () => {
    setIsMatched(false);
    setMessages([]);
    socket && socket.emit("end");
  };

  const handleReport = () => {
    socket && socket.emit("report", { strangerId });
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
