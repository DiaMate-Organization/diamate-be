import { ServerRoute } from "@hapi/hapi";
import { authMiddleware } from "../middlewares/auth";
import { getOverviewHandler } from "../handlers/overview.handlers";

const overviewRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/overview",
    options: {
      pre: [{ method: authMiddleware }],
    },
    handler: getOverviewHandler,
  },
];

export default overviewRoutes;
