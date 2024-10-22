import React, { createContext, useContext, useState, ReactNode } from "react";

interface FriendsProp {
  pairId: string;
  pairName: string;
  polite: boolean;
}

interface FriendContextType {
  friend: FriendsProp | null;
  setFriend: React.Dispatch<React.SetStateAction<FriendsProp | null>>;
}

const FriendContext = createContext<FriendContextType | undefined>(undefined);

export const FriendProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [friend, setFriend] = useState<FriendsProp | null>(null);

  return (
    <FriendContext.Provider value={{ friend, setFriend }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriend = () => {
  const context = useContext(FriendContext);
  if (context === undefined) {
    throw new Error("useFriend must be used within a FriendProvider");
  }
  return context;
};
