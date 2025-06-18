import axios from "axios";

import cacheWeather from "../cache/cache-weather";
import getCachedWeather from "../cache/get-cached-weather";
import type UnitGroup from "../constants/unit-group";
import CurrentConditions from "../types/current-conditions";
import type DayData from "../types/day-data";
import type WeatherResponse from "../types/weather-response";
import WeatherUrlParameters from "../types/weather-url-parameters";
import buildRedisKey from "../utilities/build-redis-key";
import buildWeatherUrl from "../utilities/build-weather-url";
import findCurrentWeather from "../utilities/find-current-weather";

async function getCurrentWeatherData(
  city: string,
  date: string,
  unitGroup: UnitGroup,
): Promise<DayData | CurrentConditions> {
  const key = buildRedisKey(city, date);

  const cachedWeather = await getCachedWeather(key);

  if (cachedWeather) {
    return cachedWeather;
  }

  const weatherUrlParameters: Omit<WeatherUrlParameters, "key"> = {
    city,
    contentType: "json",
    unitGroup,
  };

  const url = buildWeatherUrl(weatherUrlParameters);

  try {
    const response = await axios.get(url);
    const { days, currentConditions }: WeatherResponse = response.data;

    if (days.length === 0) {
      await cacheWeather(key, currentConditions);
      return currentConditions;
    }

    const currentWeather = findCurrentWeather(days);

    if (!currentWeather) {
      await cacheWeather(key, currentConditions);
      return currentConditions;
    }

    await cacheWeather(key, currentWeather);
    return currentWeather;
  } catch (error) {
    const error_ = axios.isAxiosError(error)
      ? new Error(`HTTP ${error.response?.status}: ${error.message}`)
      : error;
    throw error_;
  }
}

export default getCurrentWeatherData;
