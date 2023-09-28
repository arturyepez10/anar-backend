import { Request, Response } from 'express';
import { handleError } from '../../utils/errors';
import { Permission } from '../../models';

export const getPermissionsController = async (req: Request, res: Response) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    handleError(res, error);
  }
};

export const getPermissionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    res.status(200).json(permission);
  } catch (error) {
    handleError(res, error);
  }
};

export const createPermissionController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const permissionExists = await Permission.findByPk(name);
    if (permissionExists) {
      return res.status(400).json({ message: 'Permission name already exists' });
    }

    const permission = await Permission.create({
      name,
      description
    });

    res.status(201).json(permission);
  } catch (error) {
    handleError(res, error);
  }
};

export const updatePermissionController = async (req: Request, res: Response) => {
  try {
    const { name: paramName } = req.params;
    const { name, description } = req.body;

    const permission = await Permission.findByPk(paramName);

    if (!permission) {
      return res.status(400).json({ message: 'Permission does not exist' });
    }

    if (name && name !== paramName) {
      const permissionExists = await Permission.findByPk(name);
      if (permissionExists) {
        return res.status(400).json({ message: 'Permission name already exists' });
      }
    }

    await permission.update({
      name,
      description
    });

    res.status(200).json(permission);
  } catch (error) {
    handleError(res, error);
  }
};

export const deletePermissionController = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const permission = await Permission.findByPk(name);

    if (!permission) {
      return res.status(400).json({ message: 'Permission does not exist' });
    }

    await permission.destroy();

    res.status(200).json({ message: 'Permission deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};
