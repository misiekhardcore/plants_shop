declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: string;
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_URL: string;
    MONGO_DB: string;
    SERVER_TOKEN_EXPIRETIME: string;
    SERVER_TOKEN_ISSUER: string;
    SERVER_TOKEN_SECRET: string;
  }
}
