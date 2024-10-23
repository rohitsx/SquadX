import { Server } from "socket.io";
import socketDatabaseHelper from "../services/socketServiceHelper";

export default async function makePair(
  username: string,
  socketId: string,
  io: Server,
): Promise<boolean | undefined> {
  const dbHelper = new socketDatabaseHelper();
  try {
    const randomUserRaw = await dbHelper.getRandomUser(username);
    const strangerUsername = randomUserRaw.username.split(",")[0];
    const strangerId = randomUserRaw.socket_id.split(",")[0];
    if (!strangerUsername || !strangerId) return false;
    const user1 = {
      id: randomUserRaw.socket_id,
      name: randomUserRaw.username,
      pairId: socketId,
      pairName: username,
      polite: true,
    };
    const user2 = {
      id: socketId,
      name: username,
      pairId: randomUserRaw.socket_id,
      pairName: randomUserRaw.username,
      polite: false,
    };

    const check = await dbHelper.deleteFromActiveUsers(
      randomUserRaw.username,
      randomUserRaw.socket_id,
    );
    if (check === 0) return false;
    io.to(user1.id.split(",")[0]).emit("peer", user1);
    io.to(user2.id.split(",")[0]).emit("peer", user2);
    console.log("selected pair", user1.name, user2.name);
    return true;
  } catch (err) {
    console.log("error with", username, err);
  }
}
