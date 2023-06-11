import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  APP_URL: process.env.APP_URL ?? "",
  APP_PORT: process.env.APP_PORT ?? 8000,
  DATABASE_NAME: process.env.DATABASE_NAME ?? "",
  DATABASE_USER: process.env.DATABASE_USER ?? "",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? "",
  DATABASE_HOST: process.env.DATABASE_HOST ?? "localhost",
  DATABASE_PORT: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 3306,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT ?? "mysql",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
}
