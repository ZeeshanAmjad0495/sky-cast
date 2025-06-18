import "dotenv-flow/config";

import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastify from "fastify";

import environment from "./config/environment";
import limitRequestRate from "./plugins/limit-request-rate";
import redisClient, { connectRedis, disconnectRedis } from "./plugins/redis-client";
import registerSwagger from "./plugins/register-swagger";
import registerHealthCheckRoutes from "./routes/health-check.routes";
import registerWeatherRoutes from "./routes/weather.routes";

await connectRedis();

if (!redisClient.isOpen) {
  throw new Error("Redis is not connected");
}

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        ignoreFields: "pid,hostname",
        singleLine: true,
        translateTime: "SYS:standard",
      },
    },
  },
});

await server.register(cors, { origin: "*" });
await server.register(helmet);

await limitRequestRate(server);
await registerHealthCheckRoutes(server);
await registerSwagger(server);
await registerWeatherRoutes(server);

server.addHook("onClose", async () => {
  await disconnectRedis();
});

process.on("SIGINT", async () => {
  await server.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await server.close();
  process.exit(0);
});

const PORT = environment.PORT || 3000;

server.listen({ port: PORT }, (error, address) => {
  if (error) {
    server.log.error(error);
    throw error;
  }
  server.log.info(`Server is running at ${address}`);
});
