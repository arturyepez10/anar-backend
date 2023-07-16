import { Request, Response } from 'express';
import { handleError } from '../../utils/errors';
import { Card, Level, LevelCard } from '../../models';

export const getCardsController = async (req: Request, res: Response) => {
  try {
    const cards = await Card.findAll();

    res.status(200).json(cards);
  } catch (error) {
    handleError(res, error);
  }
}

export const getCardController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const card = await Card.findOne({ where: { id } });

    if (!card) {
      return res.status(400).json({ message: 'Card does not exist' });
    }

    res.status(200).json(card);
  } catch (error) {
    handleError(res, error);
  }
}

export const createCardController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      image,
      levelId
    } = req.body;

    const card = await Card.create({
      name,
      description,
      image
    });

    if (levelId) {
      const level = await Level.findOne({ where: { id: levelId } });

      if (level) {
        await LevelCard.create({
          level_id: levelId,
          card_id: card.id
        });
      }
    }

    res.status(201).json(card);
  } catch (error) {
    handleError(res, error);
  }
}

export const updateCardController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      image,
      levelId
    } = req.body;

    const card = await Card.findOne({ where: { id } });

    if (!card) {
      return res.status(400).json({ message: 'Card does not exist' });
    }

    await card.update({
      name,
      description,
      image
    });

    if (levelId) {
      const level = await Level.findOne({ where: { id: levelId } });

      if (level) {
        await LevelCard.create({
          level_id: levelId,
          card_id: card.id
        });
      }
    }

    res.status(200).json(card);
  } catch (error) {
    handleError(res, error);
  }
}

export const deleteCardController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const card = await Card.findOne({ where: { id } });

    if (!card) {
      return res.status(400).json({ message: 'Card does not exist' });
    }

    await card.destroy();
    await LevelCard.destroy({ where: { card_id: id } });

    res.status(200).json({ message: 'Card deleted' });
  } catch (error) {
    handleError(res, error);
  }
}
