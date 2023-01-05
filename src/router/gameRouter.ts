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

gameRouter.post('/', async (req: Request, res: Response) => {
  const game = await gameController.setGame(req.body.name, req.body.rules, req.body.userId).catch((err) => {
    console.log(err);
    return res.status(500).json({ prismaError: err.code });
  });
  return game ? res.status(200).json(game) : res.sendStatus(404);
});

gameRouter.put('/:id', async (req: Request, res: Response) => {
  const game = await gameController.updateGame(parseInt(req.params.id), req.body.name, req.body.rules).catch((err) => {
    console.log(err);
    return res.status(500).json({ prismaError: err.code });
  });
  return game ? res.status(200).json(game) : res.sendStatus(404);
});

gameRouter.delete('/', async (req: Request, res: Response) => {
  const station = await gameController.deleteGames(req.body.ids).catch((err) => {
    console.log(err);
    return res.status(500).json({ prismaError: err.code });
  });
  return station ? res.status(200).json(station) : res.sendStatus(404);
});
