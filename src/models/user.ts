import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class User extends Model {
  declare id: string;
  declare name: string;
  declare last_name: string;
  declare email: string;
  declare password: string;

  public getFullName(): string {
    return `${this.name} ${this.last_name}`;
  }
};

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID // generates an UUID automatically for every created instance
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);