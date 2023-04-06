import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class UserAccount extends Model {
  declare id: string;
  declare first_name: string;
  declare last_name: string;
  declare gender?: string;
  declare age?: number;

  declare auth_data?: string;

  public getFullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
};

UserAccount.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID // generates an UUID automatically for every created instance
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    auth_data: {
      type: DataTypes.UUID
    }
  },
  {
    sequelize,
    modelName: 'UserAccount'
  }
);


export { UserAccount };