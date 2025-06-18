import dotenv from 'dotenv-flow';
dotenv.config();

import fastify from 'fastify';
import redisClient, { connectRedis, disconnectRedis } from './plugins/redis-client';
import registerSwagger from './plugins/register-swagger';
import registerWeatherRoutes from './routes/weather.routes';
import limitRequestRate from './plugins/limit-request-rate';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import registerHealthCheckRoutes from './routes/health-check.routes';
import env from './config/env';

await connectRedis();

if (!redisClient.isOpen) {
  throw new Error('Redis is not connected');
}

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        singleLine: true,
      },
    },
  },
});

await server.register(cors, { origin: '*' });
await server.register(helmet);

await limitRequestRate(server);
await registerHealthCheckRoutes(server);
await registerSwagger(server);
await registerWeatherRoutes(server);

server.addHook('onClose', async () => {
  await disconnectRedis();
});

process.on('SIGINT', async () => {
  await server.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});

const PORT = env.PORT || 3000;

server.listen({ port: PORT }, (error, address) => {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }
  server.log.info(`Server is running at ${address}`);
});
