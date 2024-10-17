import { Server } from "socket.io";
import socketDatabaseHelper from "../services/socketServiceHelper";

export default async function makePair(
  username: string,
  socketId: string,
  io: Server,
):Promise <boolean | undefined> {
  const dbHelper = new socketDatabaseHelper();
  try {
    const randomUser = await dbHelper.getRandomUser(username);
	if (!randomUser) return false;
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

    const check = await dbHelper.deleteFromActiveUsers(randomUser.username, randomUser.socket_id);
	console.log('check delete user', check, randomUser.username);
	if (check === 0) return false;
    io.to(user1.id).emit("peer", user1);
    io.to(user2.id).emit("peer", user2);
	console.log('selected pair', user1.name, user2.name);
	return true;
  } catch (err) {
    console.log("error with", username, err);
  }
}
