const buildRedisKey = (city: string, date: string) => {
  const key = `weather:${city.toLowerCase().replaceAll(/\s+/g, "-")}:`;

  return `${key}${date}`;
};

export default buildRedisKey;
