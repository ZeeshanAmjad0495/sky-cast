import redisClient from "../plugins/redis-client";
import type DayData from "../types/day-data";

async function getCachedWeather(key: string): Promise<DayData | undefined> {
  try {
    const cached = await redisClient.get(key);
    return cached ? (JSON.parse(cached) as DayData) : undefined;
  } catch {
    return undefined;
  }
}

export default getCachedWeather;
