import { Socket, Server } from "socket.io";
import socketServices from "../services/socketServices";


let users: any = [];


export function handleSocketConnection(socket: Socket, io: Server) {
    const skService = new socketServices(io);
    const username = socket.handshake.auth.username
    
    console.log('A user connected');
    socket.on('connectPeer', () => skService.handleUserJoin(socket.id, username));
    socket.on('message', m => io.to(m.to).emit('message', m));
    socket.on('skip', (pairedId : string) => skService.handleUserSkip(pairedId, socket.id, username));
    socket.on('disconnect', () => {
        users = users.filter((id : any) => id !== socket.id)
        io.to(users[0]).emit('strangerLeft');
    });
}