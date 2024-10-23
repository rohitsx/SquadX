import logo from "@/assets/img/btc.png";
import { useFriend } from "@/context/friendContext";
import { useSocket } from "@/context/socketContext";
import { useStartPage } from "@/context/startPageContext";
import axios from "axios";
import { Clipboard } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface hostDuoProp {
  name: string;
  socketId: string;
}

export default function CreateDuoLink() {
  const socket = useSocket();
  const [copied, setCopied] = useState(false);
  const { setStartPage } = useStartPage();
  const { setFriend } = useFriend();

  const copyToClipboard = useCallback(() => {
    if (!socket) return;
    navigator.clipboard.writeText(
      import.meta.env.VITE_API_DOMAIN +
        "/duo/" +
        localStorage.getItem("username") +
        "/" +
        socket.id,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleConnectDuoCall = useCallback(
    (data: hostDuoProp) => {
      setFriend({ pairName: data.name, pairId: data.socketId, polite: false });
      setStartPage("duo");
    },
    [socket],
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("connectDuoCall", handleConnectDuoCall);
    return () => {
      socket.off("connectDuoCall", handleConnectDuoCall);
    };
  }, [socket]);

  return (
    <>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full text-white">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">👋 MY DUO SQUAD</h2>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-600 rounded-full overflow-hidden">
                <img
                  src={logo}
                  alt="Me"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-3xl">+</div>
              <div className="w-16 h-16 bg-purple-600 rounded-full"></div>
            </div>
            <button
              onClick={copyToClipboard}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-500 transition duration-300"
            >
              <Clipboard size={20} />
              <span>{copied ? "Copied!" : "Copy link to invite"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
