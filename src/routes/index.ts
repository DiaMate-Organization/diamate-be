import { ServerRoute } from "@hapi/hapi";
import userRoutes from "./user.routes";
import articleRoutes from "./article.routes";
import { assessmentRoutes } from "./asessment.routes";
import { chatbotRoutes } from "./chatbot.routes";
import overviewRoutes from "./overview.routes";

const routes: ServerRoute[] = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.response({ message: "Welcome to diamate api" }).code(200);
    },
  },
  ...userRoutes,
  ...articleRoutes,
  ...assessmentRoutes,
  ...chatbotRoutes,
  ...overviewRoutes,
];

export default routes;
