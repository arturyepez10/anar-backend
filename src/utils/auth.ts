import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { iJwtAuth, UserAuth } from '../classes';
import { config } from '../../config';
import { RoleAuthData, UserAuthData, UserRole, UserRolePermission } from '../models';

export const getUserAuthFromJwtAuthString = (token: string) => {
  const jwtAuth = jwt.verify(token, config.JWT_SECRET) as iJwtAuth;

  const userAuth = new UserAuth( jwtAuth );

  return userAuth;
}

export const generateJwtAuthString = async (
  user: UserAuthData,
  application?: string,
  expiresIn: string | number = '1d'
) => {
  const jwtAuth: iJwtAuth = {
    userId: user.user_id,
    roles: []
  };
  if (application) {
    const applicationRoles = await UserRole.findAll({ where: { application }, attributes: ['name'] });
    const userRoles = await RoleAuthData.findAll({ where: { user_id: user.user_id }, attributes: ['role', 'user_id'] });
    const userAppRoles = userRoles.filter(r => applicationRoles.find(ar => ar.name === r.role) !== undefined);
    
    const roles: Array<{ name: string; permissions: Array<string>; }> = [];
    for (const role of userAppRoles) {
      const permissions = await UserRolePermission.findAll({ where: { role_id: role }, attributes: ['permission_id'] });
  
      roles.push({
        name: role.role,
        permissions: permissions.map(p => p.permission_id)
      });
    }
    jwtAuth.application = application;
    jwtAuth.roles = roles;
  };

  const token = jwt.sign(jwtAuth, config.JWT_SECRET, { expiresIn });

  return token;
};

export const getAuthToken = (req: Request) => {
  const authorization = req.header("Authorization");
  return authorization && authorization.startsWith("Bearer ")
    ? authorization.substring(7)
    : undefined;
};