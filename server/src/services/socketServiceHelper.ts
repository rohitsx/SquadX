import client from "../config/database";

export default class socketDatabaseHelper {
    async getActiveUsers(): Promise<any[]> {
      const result = await client.query('SELECT * FROM activeuser');
      return result.rows;
    }
  
    async addToActiveUsers(socketId: string, username: string): Promise<void> {
      await client.query('INSERT INTO activeuser (socketid, username) VALUES ($1, $2)', [socketId, username]);
    }
  
    async updateSocketId(username: string, newSocketId: string): Promise<void> {
      await client.query('UPDATE activeuser SET socketid = $1 WHERE username = $2', [newSocketId, username]);
    }
  
    async deleteFromActivePair(socketId: string): Promise<void> {
      await client.query('DELETE FROM activepair WHERE socketid1 = $1 OR socketid2 = $1', [socketId]);
    }
  
    async getActivePair(socketId: string): Promise<any> {
      const result = await client.query('SELECT * FROM activepair WHERE socketid1 = $1 OR socketid2 = $1', [socketId]);
      return result.rows[0];
    }
  
    async removeUserFromActiveUsers(username: string, socketId: string): Promise<any> {
      const result = await client.query('DELETE FROM activeuser WHERE username = $1 AND socketid = $2', [username, socketId]);
      return result.rowCount;
    }
  
    async removeUserBySocketId(socketId: string): Promise<any> {
      const result = await client.query('DELETE FROM activeuser WHERE socketid = $1', [socketId]);
      return result.rowCount;
    }

    async getUserTableLength(): Promise<void> {
      const result = await client.query('SELECT COUNT(*) FROM activeuser');
      console.log(result);
      
    }
  }