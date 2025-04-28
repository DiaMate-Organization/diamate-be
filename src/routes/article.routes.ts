import { ServerRoute } from "@hapi/hapi";
import { getAllArticlesHandler } from "../handlers/article.handlers";
// import { loginHandler, registerHandler } from "../handlers/user.handlers";

const articleRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/article",
    handler: getAllArticlesHandler,
  },
];

export default articleRoutes;
