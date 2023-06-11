import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class HashingAlgorithm extends Model {
  declare name: string;
}

HashingAlgorithm.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'HashingAlgorithm'
  }
);

export { HashingAlgorithm };