import pg from "pg";
import { DB_URL } from "./environment";

const dbClient = new pg.Client(DB_URL);

dbClient.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export default dbClient;
