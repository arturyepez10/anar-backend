import { Request, Response } from 'express';
import { handleError } from '../../utils/errors';
import { Level, Difficulty, LevelCard } from '../../models';


export const getLevelsController = async (req: Request, res: Response) => {
  try {
    const levels = await Level.findAll();

    res.status(200).json(levels);
  } catch (error) {
    handleError(res, error);
  }
}

export const getLevelController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const level = await Level.findOne({ where: { id } });

    if (!level) {
      return res.status(400).json({ message: 'Level does not exist' });
    }

    res.status(200).json(level);
  } catch (error) {
    handleError(res, error);
  }
}

export const createLevelController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      imageName,
      goes_after,
      goes_before,
      difficulty_id
    } = req.body;

    // We verify if that difficulty exists
    const difficulty = await Difficulty.findOne({ where: { name: difficulty_id } });

    if (!difficulty) {
      return res.status(400).json({ message: 'Difficulty does not exist' });
    }

    if (goes_before) {
      const levelAfter = await Level.findOne({ where: { id: goes_before } });

      if (!levelAfter) {
        return res.status(400).json({ message: 'Level does not exist' });
      }
    }

    if (goes_after) {
      const levelBefore = await Level.findOne({ where: { id: goes_after } });

      if (!levelBefore) {
        return res.status(400).json({ message: 'Level does not exist' });
      }
    }

    const level = await Level.create({
      name,
      difficulty_id,
      description,
      imageName,
      goes_after,
      goes_before
    });

    res.status(201).json(level);
  } catch (error) {
    handleError(res, error);
  }
}

export const updateLevelController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, difficulty_id } = req.body;

    const level = await Level.findOne({ where: { id } });

    if (!level) {
      return res.status(400).json({ message: 'Level does not exist' });
    }

    await level.update({
      name,
      difficulty_id
    });

    res.status(200).json(level);
  } catch (error) {
    handleError(res, error);
  }
}

export const deleteLevelController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const level = await Level.findOne({ where: { id } });

    if (!level) {
      return res.status(400).json({ message: 'Level does not exist' });
    }

    await level.destroy();
    await LevelCard.destroy({ where: { level_id: id } });

    res.status(200).json({ message: 'Level deleted' });
  } catch (error) {
    handleError(res, error);
  }
}