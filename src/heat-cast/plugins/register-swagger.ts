import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import env from "../config/env"

async function registerSwagger(server: FastifyInstance) {
  await server.register(swagger, {
    openapi: {
      info: {
        title: 'Weather API',
        description: 'API for fetching weather data by city and unit group',
        version: '1.0.0',
      },
      servers: [
        {
          url: `${env.LOCAL_HOST}:${env.PORT}`,
        },
      ],
    },
  });

  await server.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
    },
  });
}

export default registerSwagger;
