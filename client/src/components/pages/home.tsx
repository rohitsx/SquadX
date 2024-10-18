import { useValidateToken } from "../../hooks/useValidateToken";
import StartPage from "../videoCall/startCall";
import { StartPageProvider, useStartPage } from "@/context/startPageContext";
import DuoCall from "../videoCall/call/duoCall";
import Header from "./header";
import SoloCall from "../videoCall/call/solocall";
import { SocketProvider } from "@/context/socketContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FriendProvider, useFriend } from "@/context/friendContext";

const HomeContent = () => {
  const { startPage, setStartPage } = useStartPage();
  const { duoId, duoName } = useParams();
  const { setFriend } = useFriend();

  useEffect(() => {
    if (duoId && duoName) {
      setFriend({ name: duoName, socketId: duoId, polite: true });
      setStartPage("duo");
    }
  }, [duoId, duoName]);

  return (
    <>
      {startPage === "start" && <StartPage />}
      {startPage === "solo" && <SoloCall />}
      {startPage === "duo" && <DuoCall />}
    </>
  );
};

export default function Home() {
  useValidateToken();

  return (
    <SocketProvider>
      <StartPageProvider>
        <FriendProvider>
          <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            <Header />
            <div className="flex-1 flex p-6 space-x-6">
              <HomeContent />
            </div>
          </div>
        </FriendProvider>
      </StartPageProvider>
    </SocketProvider>
  );
}
