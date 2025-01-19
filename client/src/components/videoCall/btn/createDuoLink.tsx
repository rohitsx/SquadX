import defaultPfp from "@/assets/img/defaultPfp.jpeg";
import { useSocket } from "@/context/socketContext";
import axios from "axios";
import { Clipboard } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type CreateDuoLinkProp = {
  setCheckCopied: (copied: boolean) => void;
};

export default function CreateDuoLink({ setCheckCopied }: CreateDuoLinkProp) {
  const socket = useSocket();
  const [copied, setCopied] = useState<null | boolean>(null);
  const [pfp, setPfp] = useState<string | undefined>();
  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + "/getPfp", {
        username: localStorage.getItem("username"),
      })
      .then((res) => {
        res.data !== "default" ? setPfp(res.data) : setPfp(defaultPfp);
      });
  }, []);

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
    setCheckCopied(true);
    setTimeout(() => setCopied(false), 2000);

    axios
      .post(import.meta.env.VITE_API_URL + "/addToActiveDuoCall", {
        username: localStorage.getItem("username"),
        socketId: socket.id,
        token: localStorage.getItem("token"),
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

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
                  src={pfp}
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
