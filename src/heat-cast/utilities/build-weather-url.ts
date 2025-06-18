import WeatherUrlConfig from '../types/weather-url-config';
import WeatherUrlParams from '../types/weather-url-params';

import buildQueryParams from './build-query-params';

const buildWeatherUrl =
  ({ baseUrl, apiKey }: WeatherUrlConfig) =>
  (weatherUrlParams: WeatherUrlParams) => {
    const { city, ...rest } = weatherUrlParams;
    const queryString = buildQueryParams(apiKey, rest);
    return `${baseUrl}/${city}?${queryString}`;
  };

export default buildWeatherUrl;
