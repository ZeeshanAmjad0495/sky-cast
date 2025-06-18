const buildRedisKey = (city: string, date: string) => {
  const key = `weather:${city.toLowerCase().replace(/\s+/g, '-')}:`;

  return key.concat(date);
};

export default buildRedisKey;
