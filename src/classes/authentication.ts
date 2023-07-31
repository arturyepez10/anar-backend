import { Request } from 'express';

export interface iJwtAuth {
  userId: string;
  application?: string;
  roles: Array<{ name: string; permissions: Array<string>; }>;
}

export class UserAuth implements iJwtAuth {
  userId: string;
  application?: string;
  roles: Array<{ name: string; permissions: Array<string>; }>;;

  constructor({ userId, application, roles }: iJwtAuth) {
    this.userId = userId;
    this.application = application;
    this.roles = [ ...roles ];
  }

  hasRole(role: string): boolean {
    return this.roles.find(r => r.name === role) !== undefined;
  }

  hasPermission(role: string, permission: string): boolean {
    return this.roles.find(r => r.name === role)?.permissions.includes(permission) || false;
  };
};

export interface AuthRequest extends Request {
  auth?: UserAuth;
}