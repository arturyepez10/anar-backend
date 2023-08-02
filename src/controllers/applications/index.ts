import { Request, Response } from 'express';
import { handleError } from '../../utils/errors';
import { Application } from '../../models/application';
import { eApplication } from '../../classes';

export const getApplicationsController = async (req: Request, res: Response) => {
  try {
    const applications = await Application.findAll();
    res.status(200).json(applications);
  } catch (error) {
    handleError(res, error);
  }
};

export const getApplicationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await Application.findByPk(id);
    res.status(200).json(application);
  } catch (error) {
    handleError(res, error);
  }
};

export const createApplicationController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const application = await Application.create({
      name,
      description
    });

    res.status(201).json(application);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateApplicationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(400).json({ message: 'Application does not exist' });
    }

    await application.update({
      name,
      description
    });

    res.status(200).json(application);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteApplicationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(400).json({ message: 'Application does not exist' });
    }

    if (application.name === eApplication.anar) {
      return res.status(400).json({ message: 'Application cannot be deleted' });
    }

    await application.destroy();

    res.status(200).json({ message: 'Application deleted' });
  } catch (error) {
    handleError(res, error);
  }
}