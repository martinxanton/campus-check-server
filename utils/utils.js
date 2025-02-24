import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from "../config/config.js";

export const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const getJWT = (userId, type) => {
  return jwt.sign({ userId, type }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });
};