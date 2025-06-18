import type DayData from '../types/day-data';

import redisClient from '../plugins/redis-client';
import getSecondsUntilEndOfDay from '../utilities/get-seconds-until-end-of-day';
import CurrentConditions from '../types/current-conditions';

export async function cacheWeather(
  key: string,
  weather: DayData | CurrentConditions,
): Promise<void> {
  try {
    await redisClient.set(key, JSON.stringify(weather), {
      EX: getSecondsUntilEndOfDay(),
    });
  } catch (error) {
    throw error;
  }
}

export default cacheWeather;
