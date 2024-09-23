import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import { createServer } from "http";
import 'dotenv/config'
import client from './config/database';

const app = express();
const port = 3000;
const httpServer = createServer(app);

app.use(cors());

app.use(express.json());

app.use('/', authRoutes);

client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
  });

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});