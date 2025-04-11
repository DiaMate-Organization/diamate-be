import { Server } from "@hapi/hapi";
import logger from "../utils/logger";

export const registerLoggingMiddleware = (server: Server) => {
  server.ext("onRequest", (request, h) => {
    logger.info(
      `Incoming request: ${request.method.toUpperCase()} ${request.path}`
    );
    return h.continue;
  });

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
    const statusCode = (response as any)?.output?.statusCode || 200;

    logger.info(
      `Response: ${request.method.toUpperCase()} ${
        request.path
      } -> ${statusCode}`
    );
    return h.continue;
  });
};
