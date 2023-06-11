import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

class Institution extends Model {
  declare name: string;
};

Institution.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'Institution'
  }
);

export { Institution };