import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class LevelUser extends Model {
  declare level_id: number;
  declare user_id: number;

  declare score: number;
  declare status: string;
}

LevelUser.init(
  {
    level_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    score: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'LevelUser'
  }
);

export { LevelUser };