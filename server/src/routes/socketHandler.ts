import { Server, Socket } from "socket.io";
import socketServices from "../services/socketServices";

export function handleSocketConnection(socket: Socket, io: Server) {
  const skService = new socketServices(io);
  const username = socket.handshake.auth.username;

  socket.on("connectPeer", () => {
    console.log("recived connectPeer");
    skService.handleUserJoin(socket.id, username);
  });
  socket.on("message", (m) => io.to(m.to).emit("message", m));
  socket.on("skip", (pairedId: string) => {
    console.log("recived skip request"),
      skService.handleUserSkip(pairedId, socket.id, username);
  });
  socket.on("pairedclosedtab", (pairedId: string) => {
    console.log(username, "user closed the tab");
    skService.handleCallEnd(pairedId, username, socket.id);
  });
  socket.on("chat", (m: { message: string; to: string }) => {
    console.log("recived message from", username);
    io.to(m.to).emit("chat", m.message);
  });
  socket.on("disconnect", () => console.log("socket disconnect"));
}
