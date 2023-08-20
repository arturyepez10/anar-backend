import { Request, Response } from 'express';
import { handleError } from '../../utils/errors';
import { Trivia } from '../../models';

export const getTriviasController = async (req: Request, res: Response) => {
  try {
    const trivias = await Trivia.findAll();

    res.status(200).json(trivias);
  } catch (error) {
    handleError(res, error);
  }
};

export const getTriviaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const trivia = await Trivia.findOne({ where: { id } });

    if (!trivia) {
      return res.status(404).json({ message: 'Trivia does not exist' });
    }

    res.status(200).json(trivia);
  } catch (error) {
    handleError(res, error);
  }
}

export const createTriviaController = async (req: Request, res: Response) => {
  try {
    const { question, answer, level_id } = req.body;

    const trivia = await Trivia.create({ question, answer, level_id });

    res.status(201).json(trivia);
  } catch (error) {
    handleError(res, error);
  }
}

export const updateTriviaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question, answer, level_id } = req.body;

    const trivia = await Trivia.findOne({ where: { id } });

    if (!trivia) {
      return res.status(404).json({ message: 'Trivia does not exist' });
    }

    await trivia.update({
      question,
      answer,
      level_id
    });

    res.status(200).json(trivia);
  } catch (error) {
    handleError(res, error);
  }
}

export const deleteTriviaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const trivia = await Trivia.findOne({ where: { id } });

    if (!trivia) {
      return res.status(404).json({ message: 'Trivia does not exist' });
    }

    await trivia.destroy();

    res.status(200).json({ message: 'Trivia deleted' });
  } catch (error) {
    handleError(res, error);
  }
}