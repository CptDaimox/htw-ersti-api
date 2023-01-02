import express, { Request, Response } from 'express';
import * as gameController from '../controllers/game';

export const gameRouter = express.Router();

gameRouter.get('/:id?', async (req: Request, res: Response) => {
  if (req.params.id && !isNaN(parseInt(req.params.id))) {
    const userId = parseInt(req.params.id);
    const game = await gameController.getGameByUserId(userId);
    return game ? res.status(200).json(game) : res.sendStatus(404);
  } else {
    const game = await gameController.getAllGames();
    return game ? res.status(200).json(game) : res.sendStatus(404);
  }
});
