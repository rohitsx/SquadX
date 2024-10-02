import { Server } from "socket.io";
import socketDatabaseHelper from "../services/socketServiceHelper";

export default async function makePair(username: string, socketId: string, activeUsersLen: number, io: Server) { 
    const dbHelper = new socketDatabaseHelper();
    try {
        const randomUser = await dbHelper.getRandomUser(username);
        
        console.log('randome usern', randomUser);
        
        const strangerUsername = randomUser.username;
        const user1 = {
            socketId: socketId,
            username: username,
            polite: true,
            pairedUserId: randomUser.socket_id,
            strangerUsername: strangerUsername
        };
        const user2 = {
            socketId: randomUser.socket_id,
            username: strangerUsername,
            polite: false,
            pairedUserId: socketId,
            strangerUsername: username
        };

        dbHelper.deleteFromActiveUsers(randomUser.username, randomUser.socket_id);
        io.to(user1.socketId).emit("peer", user1);
        io.to(user2.socketId).emit("peer", user2);

    } catch (err) {
        console.log(err);
    }    
}

