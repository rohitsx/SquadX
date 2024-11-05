import React, { createContext, useState, useContext, useCallback } from "react";

type ConnectionState = {
  stranger: "connected" | "disconnected";
  friend: "connected" | "disconnected";
  duo: "connected" | "disconnected";
};

interface WebRTCContextType {
  peerState: ConnectionState;
  setPeerState: React.Dispatch<React.SetStateAction<ConnectionState>>;
  updatePeerState: (
    key: keyof ConnectionState,
    status: "connected" | "disconnected",
  ) => void;
}

const peerStateContext = createContext<WebRTCContextType | undefined>(
  undefined,
);

export const PeerStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [peerState, setPeerState] = useState<ConnectionState>({
    stranger: "disconnected",
    friend: "disconnected",
    duo: "disconnected",
  });

  const updatePeerState = useCallback(
    (key: keyof ConnectionState, status: "connected" | "disconnected") => {
      setPeerState((prevState) => ({
        ...prevState,
        [key]: status,
      }));
    },
    [setPeerState],
  );

  const value = {
    peerState,
    setPeerState,
    updatePeerState,
  };

  return (
    <peerStateContext.Provider value={value}>
      {children}
    </peerStateContext.Provider>
  );
};

export const usePeerState = () => {
  const context = useContext(peerStateContext);
  if (context === undefined) {
    throw new Error("useWebRTC must be used within a RTCPeerStateProvider");
  }
  return context;
};

export default peerStateContext;
