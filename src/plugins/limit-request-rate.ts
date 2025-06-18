import rateLimit from "@fastify/rate-limit";
import fastifyRedis from "@fastify/redis";
import { FastifyInstance } from "fastify";

import environment from "../config/environment";

async function limitRequestRate(server: FastifyInstance) {
  await server.register(fastifyRedis, { url: environment.REDIS_URL });

  await server.register(rateLimit, {
    errorResponseBuilder: (_request, context) => {
      return {
        error: "Too Many Requests",
        message: `Rate limit exceeded: ${context.after}`,
        statusCode: 429,
      };
    },
    max: 20,
    redis: server.redis,
    timeWindow: "1 hour",
  });
}

export default limitRequestRate;
