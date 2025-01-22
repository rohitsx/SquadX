import { useStartPage } from "@/context/startPageContext";
import SwitchSoloDuo from "./btn/modeSwitch";
import { useState } from "react";
import CreateDuoLink from "./btn/createDuoLink";
import { useFriendConnect } from "@/hooks/useFriendConnect";

export default function StartCall() {
  const { setStartPage } = useStartPage();
  const [checkCopied, setCheckCopied] = useState(false);
  const [switchMode, setSwitchMode] = useState<"solo" | "duo">("solo");
  useFriendConnect({ copied: checkCopied });

  return (
    <div className="flex flex-col lg:flex-row gap-3 w-full">
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden relative min-h-[200px] lg:min-h-0">
        <div className="w-full h-full flex items-center justify-center p-6">
          <p className="text-3xl text-white font-semibold text-center">
            Welcome to SquadX
          </p>
        </div>
      </div>

      <div className="flex-1 bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative p-6">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-center mb-6">
            <SwitchSoloDuo
              setSwitchMode={setSwitchMode}
              switchMode={switchMode}
            />
          </div>

          {switchMode === "solo"
            ? (
              <div className="flex-grow flex items-center justify-center">
                <button
                  onClick={() => setStartPage("solo")}
                  className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 w-4/4 mx-auto"
                >
                  Start Chat
                </button>
              </div>
            )
            : <CreateDuoLink setCheckCopied={setCheckCopied} />}
        </div>
      </div>
    </div>
  );
}
