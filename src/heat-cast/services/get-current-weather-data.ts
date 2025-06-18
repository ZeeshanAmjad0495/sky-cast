import type DayData from '../types/day-data';
import type UnitGroup from '../constants/unit-group';
import type WeatherResponse from '../types/weather-response';

import axios from 'axios';
import env from '../config/env';
import findCurrentWeather from '../utilities/find-current-weather';
import getCachedWeather from '../cache/get-cached-weather';
import cacheWeather from '../cache/cache-weather';
import CurrentConditions from '../types/current-conditions';
import buildRedisKey from '../utilities/build-redis-key';
import buildWeatherUrl from '../utilities/build-weather-url';
import WeatherUrlParams from '../types/weather-url-params';

const API_KEY = env.API_KEY;
const BASE_URL = env.BASE_URL;

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

  const weatherUrlParams: WeatherUrlParams = {
    city,
    unitGroup,
    contentType: 'json',
  };

  const url = buildWeatherUrl({ baseUrl: BASE_URL, apiKey: API_KEY })(weatherUrlParams);

  try {
    const response = await axios.get(url);
    const { days, currentConditions }: WeatherResponse = response.data;

    if (!days.length) {
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
    if (axios.isAxiosError(error)) {
      throw new Error(`HTTP ${error.response?.status}: ${error.message}`);
    } else {
      throw error;
    }
  }
}

export default getCurrentWeatherData;
