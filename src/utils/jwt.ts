import jwt from "jsonwebtoken";
import User from "../types/user";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (user: User) => {
  const payload = { id: user.id, email: user.email };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
