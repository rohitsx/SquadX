import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT, PUBLIC_CLIENT_URL } from "./config/environment";
import dbClient from "./config/database";
// import RedisClient from "./config/redis";
import { handleSocketConnection } from "./routes/socketHandler";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: PUBLIC_CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.use(express.json());

app.use("/", authRoutes);

io.on("connection", (socket) => {
  handleSocketConnection(socket, io);
});

// RedisClient.connect()
//   .then(() => console.log("redis connected"))
//   .catch((err) => console.log("error connecting redis", err));

dbClient.connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
