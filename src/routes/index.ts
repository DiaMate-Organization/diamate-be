import { ServerRoute } from "@hapi/hapi";
import userRoutes from "./user.routes";
import articleRoutes from "./article.routes";
import { assessmentRoutes } from "./asessment.routes";
import { chatbotRoutes } from "./chatbot.routes";

const routes: ServerRoute[] = [
  ...userRoutes,
  ...articleRoutes,
  ...assessmentRoutes,
  ...chatbotRoutes,
];

export default routes;
