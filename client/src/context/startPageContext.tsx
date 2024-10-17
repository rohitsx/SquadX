import React, { createContext, useContext, useState } from "react";

interface StartPageContextType {
  startPage: "start" | "duo" | "solo";
  setStartPage: (value: "start" | "duo" | "solo") => void;
}

const StartPageContext = createContext<StartPageContextType | undefined>(
  undefined,
);

export const useStartPage = () => {
  const context = useContext(StartPageContext);
  if (!context) {
    throw new Error("useStartPage must be used within a StartPageProvider");
  }
  return context;
};

export const StartPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [startPage, setStartPage] = useState<"start" | "duo" | "solo">("start");

  return (
    <StartPageContext.Provider value={{ startPage, setStartPage }}>
      {children}
    </StartPageContext.Provider>
  );
};
