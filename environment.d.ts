declare namespace NodeJS {
  interface ProcessEnvironment {
    API_KEY: string;
    BASE_URL: string;
    PORT: number;
    REDIS_URL: string;
  }
}
