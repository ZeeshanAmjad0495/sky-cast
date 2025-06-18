import rateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';
import fastifyRedis from '@fastify/redis';
import env from "../config/env";

async function limitRequestRate(server: FastifyInstance) {
  await server.register(fastifyRedis, { url: env.REDIS_URL });

  await server.register(rateLimit, {
    max: 20,
    timeWindow: '1 hour',
    redis: server.redis,
    errorResponseBuilder: (_req, context) => {
      return {
        statusCode: 429,
        error: 'Too Many Requests',
        message: `Rate limit exceeded: ${context.after}`,
      };
    },
  });
}

export default limitRequestRate;
