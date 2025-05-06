import { Request, ResponseToolkit } from "@hapi/hapi";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = async (request: Request, h: ResponseToolkit) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return h
      .response({ error: "Unauthorized: No token provided" })
      .code(401)
      .takeover();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    (request as any).auth = decoded;
    return h.continue;
  } catch (err) {
    return h
      .response({ error: "Unauthorized: Invalid token" })
      .code(401)
      .takeover();
  }
};
