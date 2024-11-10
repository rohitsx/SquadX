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

  async handleUserJoin(user: handleUserJoinProp): Promise<void> {
    try {
      await this.dbHelper.updateActiveUser(user);
      const activeUsersLen = await this.dbHelper.getActiveUsersLength();

      if (activeUsersLen === 0) {
        await this.dbHelper.addToActiveUsers(user);
        return;
      }
      let pairFound = false;
      let attempts = 0;
      const maxAttempts = 3;

      while (!pairFound && attempts < maxAttempts) {
        const check = await makePair(user, this.io);
		console.log("running loop for", user.username, check);
        if (check === true) {
          pairFound = true;
        } else {
          attempts++;
        }
      }

      if (!pairFound) {
        await this.dbHelper.addToActiveUsers(user);
        console.log(
          `Failed to find a pair for ${(user.username, user.duoUsername)} after ${attempts} attempts`,
        );
      }
    } catch (error) {
      console.error("Error in handleUserJoin:", error);
      throw error;
    }
  }

  async handleCallEnd({pairId, duoId, username, socketId}:{pairId: string, duoId: string, username: string, socketId: string}): Promise<void> {
    try {
      await this.dbHelper.deleteFromActiveUsers(username, socketId);
      pairId && this.io.to(pairId).emit("strangerLeft");
	  duoId && this.io.to(duoId).emit("strangerLeft");
    } catch (err) {
      console.log(err);
    }
  }
}
