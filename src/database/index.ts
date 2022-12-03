import { Sequelize, Dialect } from "sequelize";
import { config } from "../../config";

export const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    dialect: config.DATABASE_DIALECT as Dialect,
  }
);