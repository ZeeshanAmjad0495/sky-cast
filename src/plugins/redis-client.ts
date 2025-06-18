import { createClient } from "redis";

import environment from "../config/environment";

const redisClient = createClient({
  url: environment.REDIS_URL,
});

export async function connectRedis() {
  if (!redisClient.isOpen) await redisClient.connect();
}

export async function disconnectRedis() {
  if (redisClient.isOpen) await redisClient.quit();
}

export default redisClient;
