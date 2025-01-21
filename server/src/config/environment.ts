import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const PUBLIC_CLIENT_URL = process.env.PUBLIC_CLIENT_URL;
