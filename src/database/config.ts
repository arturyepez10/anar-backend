import { sequelize } from '.';
import * as models from '../models';


export const syncModels = async (alter = false) => {
  try {
    Object.values(models).forEach(async (model) => {
      await model.sync({ alter });
    });
    console.log("Database models were synced successfully.");
  } catch (error) {
    console.error("Unable to sync models:", error);
  }
}

export const initConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB has been established successfully.");
    await syncModels();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};