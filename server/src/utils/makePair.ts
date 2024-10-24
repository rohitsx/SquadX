import { Server } from "socket.io";
import socketDatabaseHelper from "../services/socketServiceHelper";

// Types and Interfaces
interface MakePairProps {
  username: string;
  socketId: string;
  io: Server;
  duoSocketId?: string;
  duoUsername?: string;
}

interface RandomUser {
  id: string;
  username: string;
  socket_id: string;
  duo_socket_id?: string;
  duo_username?: string;
}

interface User {
  id: string;
  name: string;
  pairId: string;
  pairName: string;
  duoId?: string;
  duoName?: string;
  polite: boolean;
}

/**
 * Creates a pair between users for socket communication
 * @param props - Object containing user information and Socket.io instance
 * @returns Promise<boolean | undefined> - Success status of the pairing operation
 */
export default async function makePair({
  username,
  socketId,
  io,
  duoSocketId,
  duoUsername,
}: MakePairProps): Promise<boolean | undefined> {
  const dbHelper = new socketDatabaseHelper();

  try {
    // Get random user to pair with
    const randomUser: RandomUser = await dbHelper.getRandomUser(username);
    if (!randomUser) return false;

    // Create user objects
    const currentUser: User = {
      id: socketId,
      name: username,
      pairId: randomUser.socket_id,
      pairName: randomUser.username,
      duoId: randomUser.duo_socket_id,
      duoName: randomUser.duo_username,
      polite: true,
    };

    const stranger: User = {
      id: randomUser.socket_id,
      name: randomUser.username,
      pairId: socketId,
      pairName: username,
      duoId: duoSocketId,
      duoName: duoUsername,
      polite: false,
    };

    // Remove paired user from active users
    const deleteSuccess = await dbHelper.deleteFromActiveUsers(
      randomUser.username,
      randomUser.socket_id,
    );
    if (deleteSuccess === 0) return false;

	console.log(stranger, currentUser)

    // Emit peer events to all relevant users
	io.to(currentUser.id).emit("peer", currentUser);
	currentUser.duoId && io.to(currentUser.duoId).emit("peer", currentUser);
	io.to(stranger.id).emit("peer", stranger);
	stranger.duoId && io.to(stranger.duoId).emit("peer", stranger);


    return true;
  } catch (error) {
    console.error(`Error making pair for user ${username}:`, error);
    return undefined;
  }
}
