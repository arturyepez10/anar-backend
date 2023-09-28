import { Request, Response } from 'express';
import { handleError } from '../../utils/errors';
import { UserRole, UserRolePermission, Application, Permission } from '../../models';

export const getApplicationRolesController = async (req: Request, res: Response) => {
  try {
    const { application } = req.query;

    const applicationRoles = await UserRole.findAll({ where: { application }, attributes: ['name'] });
    const userAppRoles = applicationRoles.filter(r => applicationRoles.find(ar => ar.name === r.name) !== undefined);
    
    const roles: Array<{ name: string; permissions: Array<string>; }> = [];
    for (const role of userAppRoles) {
      const permissions = await UserRolePermission.findAll({ where: { role_id: role.name }, attributes: ['permission_id'] });
  
      roles.push({
        name: role.name,
        permissions: permissions.map(p => p.permission_id)
      });
    }

    res.status(200).json(roles);

  } catch (error) {
    handleError(res, error);
  }
};

export const getApplicationRoleController = async (req: Request, res: Response) => {
  try {
    const { application } = req.query;
    const { role } = req.params;
    
    const applicationRole = await UserRole.findOne({ where: { application, name: role }, attributes: ['name'] });

    if (!applicationRole) {
      return res.status(404).json({ message: 'Role does not exist' });
    }

    const permissions = await UserRolePermission.findAll({ where: { role_id: applicationRole.name }, attributes: ['permission_id'] });

    res.status(200).json({
      name: applicationRole.name,
      permissions: permissions.map(p => p.permission_id)
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const createApplicationRoleController = async (req: Request, res: Response) => {
  try {
    const { application: appParam } = req.query;
    const { name, permissions } = req.body;

    const application = await Application.findOne({ where: { name: appParam } });

    if (!application) {
      return res.status(404).json({ message: 'Application does not exist' });
    }

    const applicationRole = await UserRole.findOne({ where: { application: application.name, name }, attributes: ['name'] });

    if (applicationRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    const role = await UserRole.create({ application: application.name, name });

    // We check if the permissions exist, if not we avoid them
    const dbPermisssions = await Permission.findAll({ where: { name: permissions } });

    const permissionsArray = dbPermisssions.map((p) => ({
      role_id: role.name,
      permission_id: p.name
    }));

    await UserRolePermission.bulkCreate(permissionsArray);

    res.status(201).json({ role, permissions: permissionsArray });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateApplicationRoleController = async (req: Request, res: Response) => {
  try {
    const { application } = req.query;
    const { role } = req.params;
    const { name, permissions } = req.body;

    const applicationRole = await UserRole.findOne({ where: { application, name: role }, attributes: ['name'] });

    if (!applicationRole) {
      return res.status(404).json({ message: 'Role does not exist' });
    }

    await applicationRole.update({ name });

    const dbPermisssions = await Permission.findAll({ where: { name: permissions } });

    const permissionsArray = dbPermisssions.map((p) => ({
      role_id: applicationRole.name,
      permission_id: p.name
    }));

    await UserRolePermission.destroy({ where: { role_id: applicationRole.name } });
    await UserRolePermission.bulkCreate(permissionsArray);

    res.status(200).json({ role: applicationRole, permissions: permissionsArray });
  } catch (error) {
    handleError(res, error);
  }
}

export const deleteApplicationRoleController = async (req: Request, res: Response) => {
  try {
    const { application } = req.query;
    const { role } = req.params;

    const applicationRole = await UserRole.findOne({ where: { application, name: role }, attributes: ['name'] });

    if (!applicationRole) {
      return res.status(404).json({ message: 'Role does not exist' });
    }

    await UserRolePermission.destroy({ where: { role_id: applicationRole.name } });
    await applicationRole.destroy();

    res.status(204).json();
  } catch (error) {
    handleError(res, error);
  }
};