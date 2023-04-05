import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';
import { Level } from './level';
import { Card } from './card';

class LevelCard extends Model {
  declare level_id: number;
  declare card_id: number;
}

LevelCard.init(
  {
    level_id: {
      type: DataTypes.INTEGER
    },
    card_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'LevelCard',
    tableName: 'associates'
  }
);

export { LevelCard };