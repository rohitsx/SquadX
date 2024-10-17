import { Server } from "socket.io";
import socketDatabaseHelper from "../services/socketServiceHelper";

export default async function makePair(
  username: string,
  socketId: string,
  io: Server,
) {
  const dbHelper = new socketDatabaseHelper();
  try {
    const randomUser = await dbHelper.getRandomUser(username);
	if (!randomUser) return;
    const strangerUsername = randomUser.username;
    const user1 = {
      id: socketId,
      name: username,
      polite: true,
      pairId: randomUser.socket_id,
      pairName: strangerUsername,
    };
    const user2 = {
      id: randomUser.socket_id,
      name: strangerUsername,
      polite: false,
      pairId: socketId,
      pairName: username,
    };

    dbHelper.deleteFromActiveUsers(randomUser.username, randomUser.socket_id);
	dbHelper.deleteFromActiveUsers(username, socketId);
    io.to(user1.id).emit("peer", user1);
    io.to(user2.id).emit("peer", user2);
	console.log('selected pair', user1.name, user2.name);
  } catch (err) {
    console.log("error with", username, err);
  }
}
