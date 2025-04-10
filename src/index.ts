import Hapi from "@hapi/hapi";
import config from "./config";

export const initServer = async () => {
  const server = Hapi.server({
    port: config.port,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      return { message: "Hello from Hapi + TSX!" };
    },
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
