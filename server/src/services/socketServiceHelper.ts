import { PrismaClient } from "../../prisma/generated/client1";
import { psqlClient } from "../config/database";

type HandleUserJoinProp = {
  socketId: string;
  username: string;
  duoSocketId?: string;
  duoUsername?: string;
};

export default class SocketDatabaseHelper {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = psqlClient;
  }

  async updateActiveUser({
    socketId,
    username,
    duoSocketId,
    duoUsername,
  }: HandleUserJoinProp): Promise<void> {
    try {
      const existingUser = await this.checkUserExists(username);
      if (!existingUser) return;

      const result = await this.prisma.activeUser.update({
        where: { username },
        data: {
          socketId: socketId,
          duoSocketId: duoSocketId || null,
          duoUsername: duoUsername || null,
        },
      });
      result && console.log("user", username, "updated in db");
    } catch (err) {
      console.log("updateActiveUser error", err);
    }
  }

  async addToActiveUsers(user: HandleUserJoinProp): Promise<void> {
    try {
      await this.prisma.activeUser.create({
        data: {
          socketId: user.socketId,
          username: user.username,
          duoSocketId: user.duoSocketId || null,
          duoUsername: user.duoUsername || null,
        },
      });
      console.log("user", user.username, "added to db");
    } catch (err) {
      console.log("err, while added the user", err);
    }
  }

  async getActiveUsersLength(): Promise<number | null> {
    try {
      const count = await this.prisma.activeUser.count();
      return count;
    } catch (err) {
      return null;
    }
  }

  async getActiveUsers() {
    try {
      const result = await this.prisma.activeUser.findMany({
        include: {
          user: true,
        },
      });
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFromActiveUsers(
    username: string,
    socketId: string,
  ): Promise<number> {
    const result = await this.prisma.activeUser.deleteMany({
      where: {
        OR: [{ username }, { socketId }],
      },
    });
    return result.count;
  }

  async removeUserBySocketId(socketId: string): Promise<number> {
    const result = await this.prisma.activeUser.delete({
      where: { socketId },
    });
    return result ? 1 : 0;
  }

  async getRandomUser(excludeUsername: string) {
    const result = await this.prisma.$queryRaw`
    SELECT * FROM "ActiveUser" 
    WHERE username != ${excludeUsername} 
    ORDER BY RANDOM() 
    LIMIT 1
  `;

    // Since $queryRaw returns an array, we take the first element
    return Array.isArray(result) ? result[0] : null;
  }

  async checkUserExists(username: string) {
      return await this.prisma.activeUser.findUnique({
        where: { username },
      });
  }
}
