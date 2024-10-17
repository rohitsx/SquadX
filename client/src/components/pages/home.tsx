import { useValidateToken } from "../../hooks/useValidateToken";
import StartPage from "../videoCall/startCall";
import Call from "../videoCall/call";
import { StartPageProvider, useStartPage } from "@/context/startPageContext";
import DuoCall from "../videoCall/call/duoCall";

const HomeContent = () => {
  const { startPage } = useStartPage();
  return (
    <>
      {startPage === 'start' && <StartPage />}
      {startPage === 'solo' && <Call />}
      {startPage === 'duo' && <DuoCall />}
    </>
  );
};

export default function Home() {
  useValidateToken();

  return (
    <StartPageProvider>
      <HomeContent />
    </StartPageProvider>
  );
}
