import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  API_KEY: Type.String(),
  BASE_URL: Type.String(),
});

type WeatherEnv = Static<typeof schema>;

const weatherConfig = envSchema<WeatherEnv>({
  schema,
  dotenv: false,
});

export default weatherConfig;
