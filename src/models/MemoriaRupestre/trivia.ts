import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class Trivia extends Model {
  declare id: number;
  declare question: string;
  declare answer: string;
  declare level_id: number;
}

Trivia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'Trivia',
    tableName: 'trivias'
  }
);

export { Trivia };