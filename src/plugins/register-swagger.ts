import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

import environment from "../config/environment";

async function registerSwagger(server: FastifyInstance) {
  await server.register(swagger, {
    openapi: {
      info: {
        description: "API for fetching weather data by city and unit group",
        title: "Weather API",
        version: "1.0.0",
      },
      servers: [
        {
          url: `${environment.LOCAL_HOST}:${environment.PORT}`,
        },
      ],
    },
  });

  await server.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
    },
  });
}

export default registerSwagger;
