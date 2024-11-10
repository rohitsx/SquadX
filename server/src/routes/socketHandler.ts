import { Server, Socket } from "socket.io";
import socketServices from "../services/socketServices";
import { freemem } from "os";

export function handleSocketConnection(socket: Socket, io: Server) {
  const skService = new socketServices(io);
  const username = socket.handshake.auth.username;

  socket.on("connectPeer", ({ duoSocketId, duoUsername }) => {
    const user = {
      socketId: socket.id,
      username: username,
      duoSocketId: duoSocketId,
      duoUsername: duoUsername,
    };
    skService.handleUserJoin(user);
  });
  socket.on("message", (m) => {
    const emitValue: string = m.emitValue;
    io.to(m.to).emit(emitValue, m);
  });
  socket.on("skip", ({ strangerId, duoId, friendId }) => {
	  console.log("\n")
	  console.log(friendId)
    io.to(strangerId).emit("strangerLeft");
    duoId && io.to(duoId).emit("strangerLeft");
	friendId && io.to(friendId).emit("strangerLeft");
  });
  socket.on(
    "pairedclosedtab",
    ({ pairId, duoId }: { pairId: string; duoId: string }) =>
      skService.handleCallEnd({ pairId, duoId, username, socketId: socket.id }),
  );
  socket.on("chat", (m: { message: string; to: string }) =>
    io.to(m.to).emit("chat", m.message),
  );

  socket.on("startDuoCall", (to) => {
    io.to(to).emit("connectDuoCall", { name: username, socketId: socket.id });
  });

  socket.on("duoLive", (to: string) => {
    io.to(to).emit("duoLive");
  });
  socket.on("duoClosedTab", (to: string) => {
    io.to(to).emit("duoClosedTab");
  });
}
