import environment from "../config/environment";
import WeatherUrlParameters from "../types/weather-url-parameters";
import buildQueryParameters from "./build-query-parameters";

const buildWeatherUrl = (weatherUrlParameters: Omit<WeatherUrlParameters, "key">) => {
  const { city, ...rest } = weatherUrlParameters;
  const { BASE_URL, API_KEY } = environment;
  const queryString = buildQueryParameters(API_KEY, rest);
  return `${BASE_URL}/${city}?${queryString}`;
};

export default buildWeatherUrl;
