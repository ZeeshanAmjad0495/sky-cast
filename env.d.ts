declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    BASE_URL: string;
    PORT: number,
    REDIS_URL:string
  }
}
