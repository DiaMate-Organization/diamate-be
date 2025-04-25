import { ServerRoute } from "@hapi/hapi";
import { loginHandler, registerHandler } from "../handlers/user.handlers";

const userRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/register",
    handler: registerHandler,
  },
  {
    method: "POST",
    path: "/login",
    handler: loginHandler,
  },
];

export default userRoutes;
