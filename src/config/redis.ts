import { Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";

const schema = Type.Object({
  REDIS_URL: Type.String(),
});

type RedisEnvironment = Static<typeof schema>;

const redisConfig = envSchema<RedisEnvironment>({
  dotenv: false,
  schema,
});

export default redisConfig;
