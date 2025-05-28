import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { chatbotHandler } from "../handlers/chatbot.handlers";
import { authMiddleware } from "../middlewares/auth";
import { chatRequestSchema } from "../validations";

export const chatbotRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/chatbot",
    options: {
      pre: [{ method: authMiddleware }],
      validate: {
        payload: chatRequestSchema,
        failAction: (req: Request, h: ResponseToolkit, err: any) => {
          const message =
            err?.details?.map((d: any) => d.message).join(", ") ||
            err.message ||
            "Validation error";

          return h.response({ error: true, message }).code(400).takeover();
        },
      },
    },
    handler: chatbotHandler,
  },
];
