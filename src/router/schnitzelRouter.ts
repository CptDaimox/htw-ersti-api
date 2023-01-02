import express, { Request, Response } from 'express';
import * as schnitzelController from '../controllers/schnitzeljagd';

export const schnitzelRouter = express.Router();

schnitzelRouter.get('/:id?', async (req: Request, res: Response) => {
  if (req.params.id && !isNaN(parseInt(req.params.id))) {
    const schnitzelId = parseInt(req.params.id);
    const schnitzelJagd = await schnitzelController.getSchnitzelByUserId(schnitzelId);
    return schnitzelJagd ? res.status(200).json(schnitzelJagd) : res.sendStatus(404);
  } else {
    const schnitzelJagd = await schnitzelController.getAllSchnitzel();
    return schnitzelJagd ? res.status(200).json(schnitzelJagd) : res.sendStatus(404);
  }
});
