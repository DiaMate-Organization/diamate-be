import { ServerRoute } from "@hapi/hapi";
import userRoutes from "./user.routes";
import articleRoutes from "./article.routes";

const routes: ServerRoute[] = [...userRoutes, ...articleRoutes];

export default routes;
