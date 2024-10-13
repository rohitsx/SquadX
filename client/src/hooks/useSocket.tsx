import { useMemo, useEffect } from "react";
import { Socket, io } from "socket.io-client";

export default function useSocket(): Socket | null {
  const socket: Socket | null = useMemo(() => {
    if (!localStorage.getItem("username")) return null;
    return io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
      transports: ["websocket"],
      auth: { username: localStorage.getItem("username") },
    });
  }, []);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return socket;
}
