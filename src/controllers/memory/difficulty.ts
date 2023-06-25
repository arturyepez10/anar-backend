import { Request, Response } from 'express';
import { handleError } from '../../utils/errors';
import { Difficulty } from '../../models';

export const getDifficultiesController = async (req: Request, res: Response) => {
  try {
    const difficulties = await Difficulty.findAll();

    res.status(200).json(difficulties);
  } catch (error) {
    handleError(res, error);
  }
}

export const gettDifficultyController = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const difficulty = await Difficulty.findOne({ where: { name } });

    if (!difficulty) {
      return res.status(400).json({ message: 'Difficulty does not exist' });
    }

    res.status(200).json(difficulty);
  } catch (error) {
    handleError(res, error);
  }
}

export const createDifficultyController = async (req: Request, res: Response) => {
  try {
    const { name, time } = req.body;

    const difficulty = await Difficulty.create({ name, time });

    res.status(201).json(difficulty);
  } catch (error) {
    handleError(res, error);
  }
}

export const updateDifficultyController = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { name: newName, time } = req.body;

    const difficulty = await Difficulty.findOne({ where: { name } });

    if (!difficulty) {
      return res.status(400).json({ message: 'Difficulty does not exist' });
    }

    await difficulty.update({
      name: newName,
      time
    });

    res.status(200).json(difficulty);
  } catch (error) {
    handleError(res, error);
  }
}

export const deleteDifficultyController = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const difficulty = await Difficulty.findOne({ where: { name } });

    if (!difficulty) {
      return res.status(400).json({ message: 'Difficulty does not exist' });
    }

    await difficulty.destroy();

    res.status(200).json({ message: 'Difficulty was deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
}