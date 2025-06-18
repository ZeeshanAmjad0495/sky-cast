import type DayData from '../types/day-data';

import redisClient from '../plugins/redis-client';

async function getCachedWeather(key: string): Promise<DayData | null> {
  try {
    const cached = await redisClient.get(key);
    return cached ? (JSON.parse(cached) as DayData) : null;
  } catch {
    return null;
  }
}

export default getCachedWeather;
