import type { FastifyRequest, FastifyReply } from 'fastify';
import type Querystring from '../types/query-string';

import UnitGroup from '../constants/unit-group';
import getWeatherData from '../services/get-current-weather-data';
import getDateWithoutTime from '../utilities/get-date-without-time';

async function fetchWeatherData(request: FastifyRequest, reply: FastifyReply) {
  const { city, unitGroup = 'us' } = request.query as Querystring;
  const today = getDateWithoutTime(new Date());

  try {
    const group =
      unitGroup === 'metric' ? UnitGroup.METRIC : unitGroup === 'uk' ? UnitGroup.UK : UnitGroup.US;

    const data = await getWeatherData(city, today, group);
    return reply.send(data).status(200);
  } catch {
    return reply.status(400).send({ error: 'Failed to fetch weather data' });
  }
}

export default fetchWeatherData;
