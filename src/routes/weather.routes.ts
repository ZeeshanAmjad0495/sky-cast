import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";

import fetchWeatherData from "../controllers/fetch-weather-data";
import DayDataSchema from "../schemas/day-data-schema";

async function registerWeatherRoutes(server: FastifyInstance) {
  server.get(
    "/api/weather",
    {
      schema: {
        description: "Returns weather data for a given city and unit group",
        querystring: {
          properties: {
            city: { type: "string" },
            unitGroup: {
              default: "us",
              enum: ["us", "metric", "uk"],
              type: "string",
            },
          },
          required: ["city"],
          type: "object",
        },
        response: {
          200: DayDataSchema,
          400: Type.Object({
            error: Type.String(),
          }),
          500: Type.Object({
            error: Type.String(),
          }),
        },
        summary: "Get Weather Data",
      },
    },
    fetchWeatherData,
  );
}

export default registerWeatherRoutes;
