import dotenv from "dotenv";

dotenv.config();

export const { JWT_SECRET_KEY, JWT_EXPIRES_IN, DB_URI, PORT } = process.env;
