import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ClipboardCopy } from "lucide-react";
import SwitchSoloDuo from "../../btn/switchSoloDuo";

export default function RemoteVidPlaceholder({
  socket,
}: {
  socket: Socket | null;
}) {
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setSocketId(socket.id);
        console.log(socket.id);
      });
    }
    return () => {
      if (socket) {
        socket.off("connect");
      }
    };
  }, [socket]);

  const copyToClipboard = () => {
    if (socketId) {
      navigator.clipboard
        .writeText(socketId)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Failed to copy: ", err));
    }
  };

  return (
    <div className="flex flex-col h-full text-gray-300 p-4">
      <div className="flex justify-center mb-4">
        <SwitchSoloDuo />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md w-full">
          <h2 className="text-2xl mb-4 text-center">
            Waiting for friend to join...
          </h2>
          {socketId && (
            <div className="w-full mb-4">
              <p className="text-sm mb-2 text-center">Your connection code:</p>
              <div className="flex items-center">
                <input
                  type="text"
                  value={socketId}
                  readOnly
                  className="bg-gray-800 text-gray-300 px-3 py-2 rounded-l-md flex-grow min-w-0"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-r-md transition-colors"
                  aria-label="Copy to clipboard"
                >
                  <ClipboardCopy size={18} />
                </button>
              </div>
              {copied && (
                <p className="text-green-400 text-sm mt-2 text-center">
                  Copied to clipboard!
                </p>
              )}
            </div>
          )}
          <p className="text-center text-sm">
            Share this code with your friend to join the call.
          </p>
        </div>
      </div>
    </div>
  );
}
