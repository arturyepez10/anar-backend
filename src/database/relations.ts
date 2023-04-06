import { sequelize } from '.';
import * as models from '../models';

export const defineRelations = async () => {
  const {
    UserAccount,
    Institution,
    UserAccountInstitution,
    Email,
    UserAuthData,
    HashingAlgorithm,
    UserRole,
    Permission,
    UserRolePermission,
    RoleAuthData,
    Application,
    Difficulty,
    Level,
    Card,
    LevelCard
  } = models;
  
  // userAccount-institution
  UserAccount.belongsToMany(Institution, { through: UserAccountInstitution, foreignKey: 'userAccount_id' });
  Institution.belongsToMany(UserAccount, { through: UserAccountInstitution, foreignKey: 'institution_id' });

  // userAccount
  UserAccount.hasMany(Email, { as: 'emails', foreignKey: 'user_id' });
  Email.belongsTo(UserAccount, { foreignKey: 'user_id' });

  // userAuthData
  UserAuthData.hasOne(Email, { foreignKey: 'email' });
  Email.belongsTo(UserAccount, { foreignKey: 'user_auth' });

  HashingAlgorithm.hasMany(UserAuthData);
  UserAuthData.belongsTo(HashingAlgorithm, { foreignKey: 'hash_algorithm' });

  // userRole-permission
  UserRole.belongsToMany(Permission, { through: UserRolePermission, foreignKey: 'role_id' });
  Permission.belongsToMany(UserRole, { through: UserRolePermission, foreignKey: 'permission_id' });

  // userRole-userAuthData
  UserRole.belongsToMany(UserAuthData, { through: RoleAuthData, foreignKey: 'role' });
  UserAuthData.belongsToMany(UserRole, { through: RoleAuthData, foreignKey: 'user_id' });

  // userRole
  Application.hasMany(UserRole, { as: 'roles', foreignKey: 'application' });
  UserRole.belongsTo(Application, { foreignKey: 'application' });

  // ---------------------- //
  // -- MEMORIA RUPESTRE -- //
  // ---------------------- //
  // difficulty
  Difficulty.hasMany(Level, { foreignKey: "difficulty_id" });
  Level.belongsTo(Difficulty, { foreignKey: "difficulty_id" });

  // level-card
  Level.belongsToMany(Card, { through: LevelCard, foreignKey: 'level_id' });
  Card.belongsToMany(Level, { through: LevelCard, foreignKey: 'card_id' });

  // We update the database schema
  await sequelize.sync({ alter: true });
}