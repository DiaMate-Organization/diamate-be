import Hapi from "@hapi/hapi";
import routes from "./routes";
import { getConfig } from "./config";
import { registerLoggingMiddleware } from "./middlewares/logger";
import { mainPredict } from "./services/ml.service";

export const initServer = async () => {
  const config = getConfig();

  const server = Hapi.server({
    port: config.port,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["http://localhost:3000"],
      },
    },
  });

  server.route(routes);
  await registerLoggingMiddleware(server);

  await mainPredict()

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
