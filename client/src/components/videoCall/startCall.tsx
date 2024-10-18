import { useStartPage } from "@/context/startPageContext";
import SwitchSoloDuo from "./btn/switchSoloDuo";
import { useState } from "react";
import DuoCallSwtich from "./call/duoCall/duoCallSwtich";


export default function StartCall(){
  const { setStartPage } = useStartPage();
  const [switchMode, setSwitchMode] = useState<"solo" | "duo">("solo");
  return (
    <>
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-3xl text-white font-semibold">
            Welcome to Video Chat
          </p>
        </div>
      </div>
      <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative p-6">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-center mb-6">
            <SwitchSoloDuo
              setSwitchMode={setSwitchMode}
              switchMode={switchMode}
            />
          </div>
          {switchMode === "solo" ? (
            <div className="flex-grow flex items-center justify-center">
              <button
                onClick={() => setStartPage("solo")}
                className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 w-4/4 mx-auto"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <DuoCallSwtich />
          )}
        </div>
      </div>
    </>
  );
}
