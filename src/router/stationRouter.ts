import express, { Request, Response } from 'express';
import * as stationController from '../controllers/station';

export const stationRouter = express.Router();

stationRouter.get('/:id?', async (req: Request, res: Response) => {
  if (req.params.id && !isNaN(parseInt(req.params.id))) {
    const schnitzelId = parseInt(req.params.id);
    const station = await stationController.getStationSchnitzelId(schnitzelId);
    return station ? res.status(200).json(station) : res.sendStatus(404);
  } else {
    const station = await stationController.getAllStations();
    return station ? res.status(200).json(station) : res.sendStatus(404);
  }
});

stationRouter.post('/', async (req: Request, res: Response) => {
  const station = await stationController.setStation(
    req.body.location,
    req.body.gameId,
    req.body.qrCode,
    req.body.clue,
    req.body.endText,
    req.body.schnitzeljagdId,
  ).catch((err) => {
    console.log(err)
    return res.status(500).json({prismaError: err.code})
  });;
  return station ? res.status(200).json(station) : res.sendStatus(404);
});
