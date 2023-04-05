import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../database';

class UserAuthData extends Model {
  declare user_id: string;

  declare username: string;
  declare password_salt: string;
  declare password_hash: string;
  declare recovery_time?: string;
  declare recovery_token?: string;

  declare email: string;
  declare status: string;
  declare token_time?: string;
  declare token_code?: string;

  declare hash_algorithm: string;
}

UserAuthData.init(
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recovery_time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    recovery_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hash_algorithm: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'UserAuthData'
  }
);

export { UserAuthData };