import dotenv from "dotenv";

dotenv.config();

export const { JWT_SECRET_KEY, JWT_EXPIRES_IN, PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
