import redisClient from "../plugins/redis-client";
import CurrentConditions from "../types/current-conditions";
import type DayData from "../types/day-data";
import getSecondsUntilEndOfDay from "../utilities/get-seconds-until-end-of-day";

export async function cacheWeather(
  key: string,
  weather: DayData | CurrentConditions,
): Promise<void> {
  await redisClient.set(key, JSON.stringify(weather), {
    EX: getSecondsUntilEndOfDay(),
  });
}

export default cacheWeather;
