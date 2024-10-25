import { console } from "inspector";
import client from "../config/database";

type handleUserJoinProp = {
  socketId: string;
  username: string;
  duoSocketId?: string;
  duoUsername?: string;
};

export default class socketDatabaseHelper {
  async getActiveUsers(): Promise<any[] | void> {
    try {
      const result = await client.query("SELECT * FROM active_users");
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      console.log(err);
    }
  }

  async addToActiveUsers(user: handleUserJoinProp): Promise<void> {
    try {
		console.log(user)
      await client.query(
        "INSERT INTO active_users (socket_id, username, duo_socket_id, duo_username) VALUES ($1, $2, $3, $4)",
        [user.socketId, user.username, user.duoSocketId, user.duoUsername],
      );
      console.log("user", user.username, "added to db");
    } catch (err) {
      console.log("err, while added the user", err);
    }
  }

  async updateActiveUser({
    socketId,
    username,
    duoSocketId,
    duoUsername,
  }: handleUserJoinProp): Promise<void> {
    try {
      //check if user exits
      const result = await client.query(
        "SELECT * FROM active_users WHERE username = $1",
        [username],
      );
      if (result.rows.length === 0) return;

      //update
      await client.query(
        "UPDATE active_users SET socket_id = $1, duo_socket_id = $2, duo_username = $3 WHERE username = $4",
        [socketId, duoSocketId, duoUsername, username],
      );
    } catch (err) {
      console.log("updateActiveUser error", err);
    }
  }

  async deleteFromActiveUsers(
    username: string,
    socketId: string,
  ): Promise<any> {
    const result = await client.query(
      "DELETE FROM active_users WHERE username = $1 OR socket_id = $2",
      [username, socketId],
    );
    return result.rowCount;
  }

  async removeUserBySocketId(socketId: string): Promise<any> {
    const result = await client.query(
      "DELETE FROM active_users WHERE socket_id = $1",
      [socketId],
    );
    return result.rowCount;
  }

  async getActiveUsersLength(): Promise<number | null> {
    try {
      const result = await client.query("SELECT COUNT(*) FROM active_users");

      return Number(result.rows[0].count);
    } catch (err) {
      return null;
    }
  }

  async getRandomUser(excludeUsername: string): Promise<any> {
    const result = await client.query(
      "SELECT * FROM active_users WHERE username != $1 ORDER BY RANDOM() LIMIT 1",
      [excludeUsername],
    );
    return result.rows[0];
  }

  async checkUserExists(username: string): Promise<any> {
    try {
      const result = await client.query(
        "SELECT * FROM active_users WHERE username = $1",
        [username],
      );
      return result.rows[0];
    } catch (err) {
      console.log(err);
    }
  }
}
