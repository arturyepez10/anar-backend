import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class Knowledge extends Model {
  declare id: number;
  declare header: string;
  declare data: string;
  declare level_id: number;
}

Knowledge.init(
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
    modelName: 'Knowledge',
    tableName: 'knowledge'
  }
);

export { Knowledge };