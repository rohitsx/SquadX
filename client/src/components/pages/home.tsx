import { useValidateToken } from "../../hooks/useValidateToken";
import StartPage from "../videoCall/startCall";
import { StartPageProvider, useStartPage } from "@/context/startPageContext";
import Header from "./header";
import Call from "../videoCall/call/call";
import { SocketProvider } from "@/context/socketContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FriendProvider, useFriend } from "@/context/friendContext";
import { PeerStateProvider } from "@/context/peerStateContext";

const HomeContent = () => {
  const { startPage, setStartPage } = useStartPage();
  const { duoId, duoName } = useParams();
  const { setFriend } = useFriend();

  useEffect(() => {
    if (duoId && duoName) {
      setFriend({ pairName: duoName, pairId: duoId, polite: true });
      setStartPage("solo");
    }
  }, [duoId, duoName]);

  return (
    <>
      {startPage === "start" && <StartPage />}
      {startPage === "solo" && <Call />}
      {startPage === "duo" && <Call />}
    </>
  );
};

export default function Home() {
  useValidateToken();

  return (
    <SocketProvider>
      <StartPageProvider>
        <FriendProvider>
          <PeerStateProvider>
            <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
              <Header />
              <main className="flex-1 overflow-auto ">
                <div className="flex-1 h-full flex p-6 space-x-4">
                  <HomeContent />
                </div>
              </main>
            </div>
          </PeerStateProvider>
        </FriendProvider>
      </StartPageProvider>
    </SocketProvider>
  );
}
