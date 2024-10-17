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
      } else {
        const check = await makePair(username, socketId, this.io);
		if (check === false) {
			console.log('running handleUserJoin inside of handeljoin');
			this.handleUserJoin(socketId, username);
		}
		return;
      }
    } catch (error) {
      console.error("Error in handleUserJoin:", error);
      throw error;
    }
  }

  async handleUserSkip(
    pairedId: string,
  ): Promise<void> {
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
