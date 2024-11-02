import React, { createContext, useState, useContext } from 'react';

type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

interface WebRTCContextType {
  friendConnectionState: ConnectionState;
  setFriendConnectionState: React.Dispatch<React.SetStateAction<ConnectionState>>;
  strangerConnectionState: ConnectionState;
  setStrangerConnectionState: React.Dispatch<React.SetStateAction<ConnectionState>>;
}

const peerStateContext  = createContext<WebRTCContextType | undefined>(undefined);

export const PeerStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [friendConnectionState, setFriendConnectionState] = useState<ConnectionState>('disconnected');
  const [strangerConnectionState, setStrangerConnectionState] = useState<ConnectionState>('disconnected');

  const value = {
    friendConnectionState,
    setFriendConnectionState,
	strangerConnectionState,
	setStrangerConnectionState
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
    throw new Error('useWebRTC must be used within a RTCPeerStateProvider');
  }
  return context;
};

export default peerStateContext;
