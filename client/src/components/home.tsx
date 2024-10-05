import React, { useState, createContext, useContext } from "react";
import { useValidateToken } from "./hooks/useValidateToken";
import StartPage from "./videoCall/startVideoCall";
import VideoCall from "./videoCall/videoCall";

interface StartPageContextType {
  startPage: boolean;
  setStartPage: (value: boolean) => void;
}

const StartPageContext = createContext<StartPageContextType | undefined>(undefined);

export const useStartPage = () => {
  const context = useContext(StartPageContext);
  if (!context) {
    throw new Error("useStartPage must be used within a StartPageProvider");
  }
  return context;
};

const Home: React.FC = () => {
  useValidateToken();

  const [startPage, setStartPage] = useState<boolean>(false);

  return (
    <StartPageContext.Provider value={{ startPage, setStartPage }}>
      {startPage ? <VideoCall /> : <StartPage/>}
    </StartPageContext.Provider>
  );
};

export default Home;
