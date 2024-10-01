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
      console.log('username',username);
      
      await client.query(
        "INSERT INTO active_users (socket_id, username) VALUES ($1, $2)",
        [socketId, username]
      );
    } catch (err) {
      console.log(err);

      // this.getActiveUsers(username, socketId);
    }
  }

  async updateActiveUser(
    username: string,
    socketId: string
  ): Promise<void> {
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

  async deleteFromActivePair(socketId: string): Promise<void> {
    await client.query(
      "DELETE FROM activepair WHERE socket_id1 = $1 OR socket_id2 = $1",
      [socketId]
    );
  }

  async getActivePair(socketId: string): Promise<any> {
    const result = await client.query(
      "SELECT * FROM activepair WHERE socket_id1 = $1 OR socket_id2 = $1",
      [socketId]
    );
    return result.rows[0];
  }

  async deleteFromActiveUsers(
    username: string,
    socketId: string
  ): Promise<any> {
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

  async getRandomUser(): Promise<any> {
    const result = await client.query(
      "SELECT * FROM active_users ORDER BY RANDOM() LIMIT 1"
    );
    return result.rows[0];
  }
}
