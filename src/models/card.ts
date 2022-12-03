import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Card extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare image: string;
}

Card.init(
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
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Card'
  }
);
