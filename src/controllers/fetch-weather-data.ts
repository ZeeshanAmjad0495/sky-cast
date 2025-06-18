import type { FastifyReply, FastifyRequest } from "fastify";

import UnitGroup from "../constants/unit-group";
import getWeatherData from "../services/get-current-weather-data";
import type Querystring from "../types/query-string";
import getDateWithoutTime from "../utilities/get-date-without-time";

async function fetchWeatherData(request: FastifyRequest, reply: FastifyReply) {
  const { city, unitGroup } = request.query as Querystring;
  const today = getDateWithoutTime(new Date());

  try {
    let group;
    if (unitGroup === "metric") {
      group = UnitGroup.METRIC;
    } else if (unitGroup === "uk") {
      group = UnitGroup.UK;
    } else {
      group = UnitGroup.US;
    }

    const data = await getWeatherData(city, today, group);
    return reply.send(data).status(200);
  } catch {
    return reply.status(400).send({ error: "Failed to fetch weather data" });
  }
}

export default fetchWeatherData;
