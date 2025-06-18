import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import fetchWeatherData from '../controllers/fetch-weather-data';
import DayDataSchema from '../schemas/day-data-schema';

async function registerWeatherRoutes(server: FastifyInstance) {
  server.get(
    '/api/weather',
    {
      schema: {
        summary: 'Get Weather Data',
        description: 'Returns weather data for a given city and unit group',
        querystring: {
          type: 'object',
          required: ['city'],
          properties: {
            city: { type: 'string' },
            unitGroup: {
              type: 'string',
              enum: ['us', 'metric', 'uk'],
              default: 'us',
            },
          },
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
      },
    },
    fetchWeatherData,
  );
}

export default registerWeatherRoutes;
