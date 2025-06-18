import { Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";

const schema = Type.Object({
  API_KEY: Type.String(),
  BASE_URL: Type.String(),
  LOCAL_HOST: Type.String(),
  NODE_ENV: Type.Optional(
    Type.Union([Type.Literal("development"), Type.Literal("production"), Type.Literal("test")]),
  ),
  PORT: Type.Number(),
  REDIS_URL: Type.String(),
});

type EnvironmentSchema = Static<typeof schema>;

const config = envSchema<EnvironmentSchema>({
  dotenv: false,
  schema,
});

export default config;
