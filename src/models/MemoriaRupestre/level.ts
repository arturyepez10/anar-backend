import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class Level extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare imageName: string;
  declare goes_to: number;
  declare difficulty: string;
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
    },
    goes_after: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    goes_before: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Level',
    tableName: 'levels'
  }
);

// Define the "goes_to" relation
Level.hasOne(Level, { foreignKey: 'goes_before' });
Level.belongsTo(Level, { foreignKey: 'goes_after' })

export { Level };