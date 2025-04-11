import { ServerRoute } from "@hapi/hapi";
import { registerHandler } from "../handlers/user.handlers";

const userRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/register",
    handler: registerHandler,
  },
];

export default userRoutes;
