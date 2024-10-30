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
  socketId: string;
  username: string;
  duoSocketId?: string;
  duoUsername?: string;
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
  console.log({
    currentUser: currentUser.username,
    randomUser: randomUser.username,
  });

  const currentUserEmit: emitUserProp = {
    currentUserId: currentUser.socketId,
    pairId: randomUser.socketId,
    pairName: randomUser.username,
    duoId: randomUser.duoSocketId,
    duoName: randomUser.duoUsername,
    polite: false,
  };

  const randomUserEmit: emitUserProp = {
    currentUserId: randomUser.socketId,
    pairId: currentUser.socketId,
    pairName: currentUser.username,
    duoId: currentUser.duoSocketId,
    duoName: currentUser.duoUsername,
    polite: true,
  };

  const deleteSuccess = await dbHelper.deleteFromActiveUsers(
    randomUser.username,
    randomUser.socketId,
  );
  if (deleteSuccess === 0) return false;

  io.to(currentUserEmit.currentUserId).emit("peer", currentUserEmit);
  io.to(randomUserEmit.currentUserId).emit("peer", randomUserEmit);
  console.log("users paired successfully", currentUserEmit, randomUserEmit);

  if (currentUser.duoSocketId && currentUser.duoUsername) {
    currentUserDuoEmit = {
      currentUserId: currentUser.duoSocketId,
      pairId: randomUser.socketId,
      pairName: randomUser.username,
      duoId: randomUser.duoSocketId,
      duoName: randomUser.duoUsername,
      polite: false,
    };

    io.to(currentUserDuoEmit.currentUserId).emit("peer", currentUserDuoEmit);
  }

  if (randomUser.duoSocketId && randomUser.duoUsername) {
    randomUserDuoEmit = {
      currentUserId: randomUser.duoSocketId,
      pairId: currentUser.socketId,
      pairName: currentUser.username,
      duoId: currentUser.duoSocketId,
      duoName: currentUser.duoUsername,
      polite: true,
    };
    io.to(randomUserDuoEmit.currentUserId).emit("peer", randomUserDuoEmit);
  }
}
