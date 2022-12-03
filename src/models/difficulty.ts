import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Difficulty extends Model {
  declare name: string;
  declare time: number;
}

Difficulty.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Difficulty'
  }
);
