import { Request, Response } from 'express';
import { handleError } from '../../utils/errors';
import { Knowledge } from '../../models';

export const getKnowledgeController = async (req: Request, res: Response) => {
  try {
    const knowledge = await Knowledge.findAll();

    res.status(200).json(knowledge);
  } catch (error) {
    handleError(res, error);
  }
};

export const getKnowledgeByIDController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const knowledge = await Knowledge.findOne({ where: { id } });

    if (!knowledge) {
      return res.status(404).json({ message: 'Knowledge does not exist' });
    }

    res.status(200).json(knowledge);
  } catch (error) {
    handleError(res, error);
  }
}

export const createKnowledgeController = async (req: Request, res: Response) => {
  try {
    const { question, answer, level_id } = req.body;

    const knowledge = await Knowledge.create({ question, answer, level_id });

    res.status(201).json(knowledge);
  } catch (error) {
    handleError(res, error);
  }
}

export const updateKnowledgeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question, answer, level_id } = req.body;

    const knowledge = await Knowledge.findOne({ where: { id } });

    if (!knowledge) {
      return res.status(404).json({ message: 'Knowledge does not exist' });
    }

    await knowledge.update({
      question,
      answer,
      level_id
    });

    res.status(200).json(knowledge);
  } catch (error) {
    handleError(res, error);
  }
}

export const deleteKnowledgeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const knowledge = await Knowledge.findOne({ where: { id } });

    if (!knowledge) {
      return res.status(404).json({ message: 'Knowledge does not exist' });
    }

    await knowledge.destroy();

    res.status(200).json({ message: 'Knowledge deleted' });
  } catch (error) {
    handleError(res, error);
  }
}