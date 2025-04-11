import Hapi from "@hapi/hapi";
import config from "./config";
import routes from "./routes";

export const initServer = async () => {
  const server = Hapi.server({
    port: config.port,
    host: "localhost",
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
