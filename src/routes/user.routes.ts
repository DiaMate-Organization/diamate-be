import { ServerRoute } from "@hapi/hapi";
import { registerHandler } from "../handlers/user.handlers";

const userRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/register",
    handler: registerHandler,
  },
];

export default userRoutes;
