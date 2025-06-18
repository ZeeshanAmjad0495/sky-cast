import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  NODE_ENV: Type.Optional(
    Type.Union([Type.Literal('development'), Type.Literal('production'), Type.Literal('test')]),
  ),
  PORT: Type.Number(),
  API_KEY: Type.String(),
  BASE_URL: Type.String(),
  LOCAL_HOST: Type.String(),
  REDIS_URL: Type.String(),
});

type EnvSchema = Static<typeof schema>;

const config = envSchema<EnvSchema>({
  schema,
  dotenv: false,
});

export default config;
