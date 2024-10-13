import { useValidateToken } from "../../hooks/useValidateToken";
import StartPage from "../videoCall/startCall";
import Call from "../videoCall/call";
import { StartPageProvider, useStartPage } from "@/context/startPageContext";

const HomeContent = () => {
  const { startPage } = useStartPage();
  return startPage ? <Call /> : <StartPage />;
};

export default function Home() {
  useValidateToken();

  return (
    <StartPageProvider>
      <HomeContent />
    </StartPageProvider>
  );
}
