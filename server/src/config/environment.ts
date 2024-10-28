import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || "localhost";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const PUBLIC_CLIENT_URL = process.env.PUBLIC_CLIENT_URL;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_AUTH = process.env.REDIS_AUTH;
export const SALT_ROUNDS = process.env.SALT_ROUNDS;
