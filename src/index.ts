import Hapi from "@hapi/hapi";
import routes from "./routes";
import { getConfig } from "./config";
import { registerLoggingMiddleware } from "./middlewares/logger";
import { loadModel } from "./services/ml.services";

export const initServer = async () => {
  const config = getConfig();

  const server = Hapi.server({
    port: config.port,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: [config.frontendOrigin],
      },
    },
  });

  const model = await loadModel();

  server.app.model = model;

  server.route(routes);
  await registerLoggingMiddleware(server);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
