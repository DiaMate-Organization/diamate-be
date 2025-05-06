import { ServerRoute } from "@hapi/hapi";
import {
  loginHandler,
  profileHandler,
  registerHandler,
} from "../handlers/user.handlers";
import { authMiddleware } from "../middlewares/auth";

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
  {
    method: "GET",
    path: "/profile",
    options: {
      pre: [{ method: authMiddleware }],
    },
    handler: profileHandler,
  },
];

export default userRoutes;
