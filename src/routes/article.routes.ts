import { ServerRoute } from "@hapi/hapi";
import {
  getAllArticlesHandler,
  getArticleHandler,
} from "../handlers/article.handlers";

const articleRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/article",
    handler: getAllArticlesHandler,
  },
  {
    method: "GET",
    path: "/article/{slug}",
    handler: getArticleHandler,
  },
];

export default articleRoutes;
