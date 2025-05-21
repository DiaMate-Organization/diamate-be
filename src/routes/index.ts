import { ServerRoute } from "@hapi/hapi";
import userRoutes from "./user.routes";
import articleRoutes from "./article.routes";
import { assessmentRoutes } from "./asessment.routes";

const routes: ServerRoute[] = [
  ...userRoutes,
  ...articleRoutes,
  ...assessmentRoutes,
];

export default routes;
