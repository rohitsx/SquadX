import { useMemo } from "react";
import { Socket, io } from "socket.io-client";

export default function useSocket(): Socket {
  const socket: Socket = useMemo(() => {
    return io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
      transports: ["websocket"],
      auth: { username: localStorage.getItem("username") },
    });
  }, []);

  return socket;
}