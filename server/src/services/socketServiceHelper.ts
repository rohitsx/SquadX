import client from "../config/database";

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

  async addToActiveUsers(socketId: string, username: string): Promise<void> {
    try {
      console.log("username", username);

      await client.query(
        "INSERT INTO active_users (socket_id, username) VALUES ($1, $2)",
        [socketId, username]
      );
    } catch (err) {
      console.log(err);

      // this.getActiveUsers(username, socketId);
    }
  }

  async updateActiveUser(username: string, socketId: string): Promise<void> {
    try {
      //check if user exits
      const result = await client.query(
        "SELECT * FROM active_users WHERE username = $1",
        [username]
      );

      if (result.rows.length === 1) {
        //update
        await client.query(
          "UPDATE active_users SET socket_id = $1 WHERE username = $2",
          [socketId, username]
        );
      }
    } catch {
      console.log("updateActiveUser error");
    }
  }

  async deleteFromActiveUsers(
    username: string,
    socketId: string
  ): Promise<any> {
    console.log("working", username, socketId);

    const result = await client.query(
      "DELETE FROM active_users WHERE username = $1 AND socket_id = $2",
      [username, socketId]
    );
    return result.rowCount;
  }

  async removeUserBySocketId(socketId: string): Promise<any> {
    const result = await client.query(
      "DELETE FROM active_users WHERE socket_id = $1",
      [socketId]
    );
    return result.rowCount;
  }

  async getActiveUsersLength(): Promise<number | null> {
    try {
      const result = await client.query("SELECT COUNT(*) FROM active_users");

      return result.rows[0].count;
    } catch (err) {
      return null;
    }
  }

  async getRandomUser(excludeUsername: string): Promise<any> {
    const result = await client.query(
      "SELECT * FROM active_users WHERE username != $1 ORDER BY RANDOM() LIMIT 1",
      [excludeUsername]
    );
    return result.rows[0];
  }

  async checkUserExists(username: string): Promise<any> {
    try {
      const result = await client.query(
        "SELECT * FROM active_users WHERE username = $1",
        [username]
      );
      return result.rows[0];
    } catch (err) {
      console.log(err);
    }
  }
}
