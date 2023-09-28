import { Request, Response } from 'express';
import { handleError } from '../../../utils/errors';
import { Level, Difficulty, LevelCard, LevelUser, UserAuthData } from '../../../models';

export const getLevelUserInfo = async (req: Request, res: Response) => {
  try {
    const { levelId, userId } = req.params;

    const level = await Level.findOne({ where: { id: levelId } });

    if (!level) {
      return res.status(400).json({ message: 'Level does not exist' });
    }

    const levelUser = await LevelUser.findOne({ where: { level_id: levelId, user_id: userId } });

    if (!levelUser) {
      return res.status(400).json({ message: 'User information does not exist on the level' });
    }

    res.status(200).json(levelUser);
  } catch (error) {
    handleError(res, error);
  }
};

export const completeLevel = async (req: Request, res: Response) => {
  try {
    const { levelId, userId } = req.params;
    const { score, status } = req.body;

    console.log(req.body);
    console.log(req.params);

    const level = await Level.findOne({ where: { id: levelId } });

    if (!level) {
      return res.status(400).json({ message: 'Level does not exist' });
    }

    const user = await UserAuthData.findOne({ where: { username: userId }, attributes: ['user_id'] });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    let levelUser = await LevelUser.findOne({ where: { level_id: levelId, user_id: user.user_id } });

    if (!levelUser) {
      levelUser = await LevelUser.create({ level_id: +levelId, user_id: user.user_id, score, status });

      res.status(201).json(levelUser);
    } else {
      await levelUser.update({ score, status });
  
      res.status(200).json(levelUser);
    }
  } catch (error) {
    handleError(res, error);
  } 
};

export const getLevelScores = async (req: Request, res: Response) => {
  try {
    const { levelId } = req.params;

    const level = await Level.findOne({ where: { id: levelId } });

    if (!level) {
      return res.status(400).json({ message: 'Level does not exist' });
    }

    const levelUsers = await LevelUser.findAll({ where: { level_id: levelId } });

    if (!levelUsers) {
      return res.status(400).json({ message: 'No users have been registered into this level' });
    }

    res.status(200).json(levelUsers);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUsersScores = async (req: Request, res: Response) => {
  try {
    const levelUsers = await LevelUser.findAll();

    res.status(200).json(levelUsers);
  } catch (error) {
    handleError(res, error);
  }
};