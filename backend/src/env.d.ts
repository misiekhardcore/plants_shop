declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_URL: string;
    MONGO_DB: string;
  }
}
