import Hapi from "@hapi/hapi";
import config from "./config";
import routes from "./routes";

export const initServer = async () => {
  const server = Hapi.server({
    port: config.port,
    host: "0.0.0.0",
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
