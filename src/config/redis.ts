import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  REDIS_URL: Type.String(),
});

type RedisEnv = Static<typeof schema>;

const redisConfig = envSchema<RedisEnv>({
  schema,
  dotenv: false,
});

export default redisConfig;
