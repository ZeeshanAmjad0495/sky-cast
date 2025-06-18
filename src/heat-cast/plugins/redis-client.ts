import { createClient } from 'redis';
import env from "../config/env"

const redisClient = createClient({
  url: env.REDIS_URL,
});

export async function connectRedis() {
  if (!redisClient.isOpen) await redisClient.connect();
}

export async function disconnectRedis() {
  if (redisClient.isOpen) await redisClient.quit();
}

export default redisClient;
