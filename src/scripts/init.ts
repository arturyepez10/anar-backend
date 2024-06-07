import { eApplication } from "../classes";
import { sequelize } from "../database";
import { initConnection } from "../database/config";
import { Application, Difficulty, HashingAlgorithm } from "../models";

const initialization = async () => {
  await initConnection();

  // We add the 'bcrypt' initial Hashing Algorithm available in the database
  await HashingAlgorithm.create({ name: 'bcrypt' });

  // We add the initial applications available in the database
  await Application.create({ name: eApplication.anar, description: "Main hub for ANAR applications." });
  await Application.create({ name: eApplication.memory, description: "Memory game for cave figures." });

  // We create the test user

  sequelize.close();
};

initialization();