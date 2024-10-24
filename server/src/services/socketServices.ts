import { Server } from "socket.io";
import socketDatabaseHelper from "./socketServiceHelper";
import makePair from "../utils/makePair";

type handleUserJoinProp = {
  socketId: string;
  username: string;
  duoSocketId?: string;
  duoUsername?: string;
};

export default class socketServices {
  private io: Server;
  private dbHelper: socketDatabaseHelper;

  constructor(io: Server) {
    this.io = io;
    this.dbHelper = new socketDatabaseHelper();
  }

  async handleUserJoin({
    socketId,
    username,
    duoSocketId,
    duoUsername,
  }: handleUserJoinProp): Promise<void> {
    try {
      const delay = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
      let pairFound = false;
      let attempts = 0;
      const maxAttempts = 3;

      while (!pairFound && attempts < maxAttempts) {
        await this.dbHelper.updateActiveUser({socketId, username ,duoSocketId, duoUsername});

        console.log("connected", username);
        const activeUsersLen = await this.dbHelper.getActiveUsersLength();

        console.log("active users length", activeUsersLen);
        if (activeUsersLen === 0) {
          await this.dbHelper.addToActiveUsers({socketId, username, duoSocketId, duoUsername});
          break;
        }
        const check = await makePair({username, socketId, io : this.io, duoSocketId, duoUsername});
        if (check === true) {
          pairFound = true;
        } else {
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      if (!pairFound) {
        await this.dbHelper.addToActiveUsers({socketId, username});
        console.log(
          `Failed to find a pair for ${username} after ${attempts} attempts`,
        );
      }
    } catch (error) {
      console.error("Error in handleUserJoin:", error);
      throw error;
    }
  }

  async handleCallEnd(
    pairedId: string,
    username: string,
    socketId: string,
  ): Promise<void> {
    try {
      await this.dbHelper.deleteFromActiveUsers(username, socketId);
      pairedId && this.io.to(pairedId).emit("strangerLeft");
      console.log("user", username, "deleted from db");
    } catch (err) {
      console.log(err);
    }
  }
}
