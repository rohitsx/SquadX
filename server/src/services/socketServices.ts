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

  private emitWaitingStatus(socketId: string): void {
    this.io.to(socketId).emit("waitingForOtherToJoin");
  }

  async handleUserJoin(socketId: string, username: string): Promise<void> {
    try {
      const checkSocketUpdate = await this.dbHelper.updateActiveUser(
        username,
        socketId
      );

      const activeUsersLen = await this.dbHelper.getActiveUsersLength();

      if (!activeUsersLen) return;

      if (Number(activeUsersLen) === 0) {
        await this.dbHelper.addToActiveUsers(socketId, username);
      } else {
        await makePair(username, socketId, activeUsersLen, this.io);
      }
    } catch (error) {
      console.error("Error in handleUserJoin:", error);
      throw error;
    }
  }

  async handleUserSkip(
    pairedId: string,
    socketId: string,
    username: string
  ): Promise<void> {
    try {
      await this.handleUserJoin(socketId, username);
      this.io.to(pairedId).emit('strangerLeft');
    } catch (error) {
      console.error("Error in handleUserLeave:", error);
      throw error;
    }
  }

  // async removeUser(socketId: string, username: string): Promise<void> {
  //   try {
  //     let deleteResult = await this.dbHelper.removeUserFromActiveUsers(username, socketId);
  //     if (deleteResult === 0) {
  //       deleteResult = await this.dbHelper.removeUserBySocketId(socketId);
  //       if (deleteResult === 0) {
  //         throw new Error('No user found');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error in removeUser:', error);
  //     throw error;
  //   }
  // }

  // async updateUserSocketId(username: string, newSocketId: string): Promise<void> {
  //   try {
  //     await this.dbHelper.updateSocketId(username, newSocketId);
  //   } catch (error) {
  //     console.error('Error in updateUserSocketId:', error);
  //     throw error;
  //   }
  // }

  // async handleUserLeave(socketId: string): Promise<void> {
  //   try {
  //     const pair = await this.dbHelper.getActivePair(socketId);
  //     if (pair) {
  //       const otherSocketId = pair.socketid1 === socketId ? pair.socketid2 : pair.socketid1;
  //       const otherUsername = pair.socketid1 === socketId ? pair.username2 : pair.username1;

  //       this.io.to(otherSocketId).emit('userLeftTheChat');
  //       await this.dbHelper.deleteFromActivePair(socketId);

  //       const activeUsers = await this.dbHelper.getActiveUsers();
  //       if (activeUsers.length > 0) {
  //         await makePair(otherUsername, otherSocketId);
  //       } else {
  //         await this.dbHelper.addToActiveUsers(otherSocketId, otherUsername);
  //         this.emitWaitingStatus(otherSocketId);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error in handleUserLeave:', error);
  //     throw error;
  //   }
  // }

  // async handleReconnect(socketId: string, username: string): Promise<void> {
  //   try {
  //     const pair = await this.dbHelper.getActivePair(socketId);
  //     if (!pair) {
  //       const activeUsers = await this.dbHelper.getActiveUsers();
  //       const existingUser = activeUsers.find(user => user.username === username);
  //       if (existingUser) {
  //         await this.dbHelper.updateSocketId(username, socketId);
  //       } else {
  //         await this.dbHelper.addToActiveUsers(socketId, username);
  //       }
  //     } else {
  //       await this.handleUserLeave(socketId);
  //       await this.handleUserJoin(socketId, username);
  //     }
  //   } catch (error) {
  //     console.error('Error in handleReconnect:', error);
  //     throw error;
  //   }
  // }
}
