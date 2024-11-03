import { useCallback, useEffect } from "react";
import axios from "axios";
import { useFriend } from "@/context/friendContext";
import { useStartPage } from "@/context/startPageContext";
import { useSocket } from "@/context/socketContext";

interface HostDuoProp {
  name: string;
  socketId: string;
}

export const useFriendConnect = ({ copied }: { copied: null | boolean }) => {
  const socket = useSocket();
  const { setFriend } = useFriend();
  const { setStartPage } = useStartPage();
  const handleConnectDuoCall = useCallback(
    (data: HostDuoProp) => {
      setFriend({ pairName: data.name, pairId: data.socketId, polite: false });
      setStartPage("solo");
    },
    [setFriend, setStartPage],
  );

  const handleBeforeUnload = useCallback(() => {
    axios.post(import.meta.env.VITE_API_URL + "/deleteFromActiveDuoCall", {
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connectDuoCall", handleConnectDuoCall);
    return () => {
      socket.off("connectDuoCall", handleConnectDuoCall);
    };
  }, [socket, handleConnectDuoCall, copied]);

  useEffect(() => {
    if (!copied) return;
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload, copied]);
};
