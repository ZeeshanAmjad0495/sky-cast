import type WeatherUrlParams from '../types/weather-url-params';

import sanitizeParams from './sanitize-params';

const buildQueryParams = (apiKey: string, params: Omit<WeatherUrlParams, 'city'>): string => {
  const { include, ...rest } = params;

  const query: Record<string, string> = {
    key: apiKey,
    contentType: 'json',
    ...sanitizeParams(rest),
  };

  if (include?.length) {
    query['include'] = include.join(',');
  }

  return new URLSearchParams(query).toString();
};

export default buildQueryParams;
