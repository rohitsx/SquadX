import { Socket, Server } from "socket.io";
import socketServices from "../services/socketServices";


let users: any = [];

function makePeer(socketId: string, io: Server) {
    if (!users.includes(socketId)) {
        users.push(socketId);
    }
    if (users.length === 2) {
        io.to(users[0]).emit('peer', { 'strangerId': users[1], 'polite': true });
        io.to(users[1]).emit('peer', { 'strangerId': users[0], 'polite': false });
        users = []
    }
}

export function handleSocketConnection(socket: Socket, io: Server) {
    const skService = new socketServices(io);
    console.log('A user connected');
    // socket.on('connectPeer', () => makePeer(socket.id, io));
    // socket.on('connectPeer', skService.handleUserJoin)
    socket.on('message', m => io.to(m.to).emit('message', m));
    socket.on('disconnect', () => {
        users = users.filter((id : any) => id !== socket.id)
        io.to(users[0]).emit('strangerLeft');
    });
}