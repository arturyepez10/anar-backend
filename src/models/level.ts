import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Level extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare imageName: string;
}

Level.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Level'
  }
);
