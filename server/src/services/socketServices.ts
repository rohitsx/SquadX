import { Server } from "socket.io";
import socketDatabaseHelper from "./socketServiceHelper";
import makePair from "../utils/makePair";

export default class socketServices {
  private io: Server;
  private dbHelper: socketDatabaseHelper;

  constructor(io: Server) {
    this.io = io;
    this.dbHelper = new socketDatabaseHelper();
  }

  async handleUserJoin(socketId: string, username: string): Promise<void> {
    try {
      await this.dbHelper.updateActiveUser(username, socketId);
      const activeUsersLen = await this.dbHelper.getActiveUsersLength();

      if (activeUsersLen === 0) {
        await this.dbHelper.addToActiveUsers(socketId, username);
        return;
      }

      let pairFound = false;
      let attempts = 0;
      const maxAttempts = 5;

      while (!pairFound && attempts < maxAttempts) {
        const check = await makePair(username, socketId, this.io);
        if (check === true) {
          pairFound = true;
        } else {
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, 1000));         }
      }

      if (!pairFound) {
        console.log(
          `Failed to find a pair for ${username} after ${maxAttempts} attempts`,
        );
      }
    } catch (error) {
      console.error("Error in handleUserJoin:", error);
      throw error;
    }
  }

  async handleUserSkip(pairedId: string): Promise<void> {
    try {
      this.io.to(pairedId).emit("strangerLeft");
    } catch (error) {
      console.error("Error in handleUserLeave:", error);
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
