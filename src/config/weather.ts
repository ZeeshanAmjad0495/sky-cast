import { Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";

const schema = Type.Object({
  API_KEY: Type.String(),
  BASE_URL: Type.String(),
});

type WeatherEnvironment = Static<typeof schema>;

const weatherConfig = envSchema<WeatherEnvironment>({
  dotenv: false,
  schema,
});

export default weatherConfig;
