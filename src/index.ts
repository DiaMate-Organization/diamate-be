import Hapi from "@hapi/hapi";
import routes from "./routes";
import { getConfig } from "./config";

export const initServer = async () => {
  const config = getConfig();

  const server = Hapi.server({
    port: config.port,
    host: "0.0.0.0",
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
