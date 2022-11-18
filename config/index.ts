import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  APP_URL: process.env.APP_URL ?? "",
  APP_PORT: process.env.APP_PORT ?? 8000
}
