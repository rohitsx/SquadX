import React, { createContext, useContext, useState } from "react";

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

export const StartPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [startPage, setStartPage] = useState<boolean>(false);

  return (
    <StartPageContext.Provider value={{ startPage, setStartPage }}>
      {children}
    </StartPageContext.Provider>
  );
};
