import { Server } from "socket.io";
import socketDatabaseHelper from "../services/socketServiceHelper";

// Types and Interfaces
interface MakePairProps {
  username: string;
  socketId: string;
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

interface emitUserProp {
  currentUserId: string;
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
export default async function makePair(
  user: MakePairProps,
  io: Server,
): Promise<boolean | undefined> {
  const dbHelper = new socketDatabaseHelper();

  try {
    // Get random user to pair with
    const randomUser: RandomUser = await dbHelper.getRandomUser(user.username);
	console.log({randomUser: randomUser});
    if (!randomUser) return false;

	sendPair(randomUser, user, dbHelper, io);

    return true;
  } catch (error) {
    console.error(`Error making pair for user ${user.username}:`, error);
    return undefined;
  }
}

async function sendPair(
  randomUser: RandomUser,
  currentUser: MakePairProps,
  dbHelper: socketDatabaseHelper, 
  io: Server,
) {
  let currentUserDuoEmit: emitUserProp | null;
  let randomUserDuoEmit: emitUserProp | null;
  console.log({currentUser: currentUser, randomUser: randomUser});

  const currentUserEmit: emitUserProp = {
    currentUserId: currentUser.socketId,
    pairId: randomUser.socket_id,
    pairName: randomUser.username,
    duoId: randomUser.duo_socket_id,
    duoName: randomUser.duo_username,
    polite: false,
  };

  const randomUserEmit: emitUserProp = {
    currentUserId: randomUser.socket_id,
    pairId: currentUser.socketId,
    pairName: currentUser.username,
    duoId: currentUser.duoSocketId,
    duoName: currentUser.duoUsername,
    polite: true,
  };

  const deleteSuccess = await dbHelper.deleteFromActiveUsers(
    randomUser.username,
    randomUser.socket_id,
  );
  if (deleteSuccess === 0) return false;

  io.to(currentUserEmit.currentUserId).emit("peer", currentUserEmit);
  io.to(randomUserEmit.currentUserId).emit("peer", randomUserEmit);

  if (currentUser.duoSocketId && currentUser.duoUsername) {
    currentUserDuoEmit = {
      currentUserId: currentUser.duoSocketId,
      pairId: randomUser.socket_id,
      pairName: randomUser.username,
      duoId: randomUser.duo_socket_id,
      duoName: randomUser.duo_username,
      polite: false,
    };

    io.to(currentUserDuoEmit.currentUserId).emit("peer", currentUserDuoEmit);
  }

  if (randomUser.duo_socket_id && randomUser.duo_username) {
    randomUserDuoEmit = {
      currentUserId: randomUser.duo_socket_id,
      pairId: currentUser.socketId,
      pairName: currentUser.username,
      duoId: currentUser.duoSocketId,
      duoName: currentUser.duoUsername,
      polite: true,
    };
    io.to(randomUserDuoEmit.currentUserId).emit("peer", randomUserDuoEmit);
  }
}
