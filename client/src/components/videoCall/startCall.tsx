import { useStartPage } from "@/context/startPageContext";
import Header from "../pages/header";
import { Switch } from "@/components/ui/switch";

export default function StartCall() {
  const { setStartPage } = useStartPage();

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="flex-1 flex p-6 space-x-6">
        <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
          <div className="flex-1 relative bg-gray-900">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
              <p className="text-3xl text-white font-semibold">
                Welcome to Video Chat
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="flex items-center justify-between w-64 p-4 bg-gray-700 rounded-lg shadow-inner">
                <span className="text-lg font-medium">Duo Mode</span>
                <Switch
                  id="duo-mode"
                  onCheckedChange={() => setStartPage("duo")}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>
            <button
              onClick={() => setStartPage("solo")}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
			Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
