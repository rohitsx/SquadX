import pg from "pg";
import {DB_URL} from "../config/envirnoment";


const client = new pg.Client(DB_URL)

client.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export default client;