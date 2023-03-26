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
      type: DataTypes.INTEGER,
      references: {
        model: Level,
        key: 'id'
      }
    },
    card_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Card,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'LevelCard',
    tableName: 'associates'
  }
);

Level.belongsToMany(Card, { through: LevelCard, foreignKey: 'level_id' });
Card.belongsToMany(Level, { through: LevelCard, foreignKey: 'card_id' });

export { LevelCard };