import { ServerRoute } from "@hapi/hapi";
import { authMiddleware } from "../middlewares/auth";
import {
  getOverviewHandler,
  getReportHandler,
} from "../handlers/overview.handlers";

const overviewRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/overview",
    options: {
      pre: [{ method: authMiddleware }],
    },
    handler: getOverviewHandler,
  },
  {
    method: "GET",
    path: "/report",
    options: {
      pre: [{ method: authMiddleware }],
    },
    handler: getReportHandler,
  },
];

export default overviewRoutes;
