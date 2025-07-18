import { sequelize } from '.';
import * as models from '../models';

export const defineRelations = async (alter = false) => {
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
    LevelCard,
    LevelUser,
    Knowledge
  } = models;
  
  // userAccount-institution
  UserAccount.belongsToMany(Institution, { through: UserAccountInstitution, foreignKey: 'userAccount_id' });
  Institution.belongsToMany(UserAccount, { through: UserAccountInstitution, foreignKey: 'institution_id' });

  // userAccount
  UserAccount.hasMany(Email, { as: 'emails', foreignKey: 'user_id' });
  Email.belongsTo(UserAccount, { foreignKey: 'user_id' });

  UserAccount.hasOne(UserAuthData, { foreignKey: 'user_id' });
  UserAuthData.belongsTo(UserAccount, { foreignKey: 'user_id' });

  // userAuthData
  UserAuthData.hasOne(Email, { foreignKey: 'email' });
  Email.belongsTo(UserAccount, { foreignKey: 'user_auth' }); // TODO: here should be the model of UserAuthData

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

  // Level and users (can_play)
  Level.belongsToMany(UserAccount, { through: LevelUser, foreignKey: 'level_id' });
  UserAccount.belongsToMany(Level, { through: LevelUser, foreignKey: 'user_id' });

  // trivia TODO: fix
  // Knowledge.hasOne(Level, { foreignKey: 'level_id' });
  // Level.belongsTo(Knowledge);

  // We update the database schema
  await sequelize.sync({ alter });
}