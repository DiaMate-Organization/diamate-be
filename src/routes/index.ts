import { ServerRoute } from "@hapi/hapi";

const routes: ServerRoute[] = [
  {
    method: "GET",
    path: "/",
    handler: () => {
      return { message: "Hello from Hapi + TSX!" };
    },
  },
];

export default routes;
