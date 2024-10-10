import Header from '../landing/header'
import { useStartPage } from '../landing/home';

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
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={() => setStartPage(true)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Start Video Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
