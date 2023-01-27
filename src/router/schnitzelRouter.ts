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

schnitzelRouter.post('/', async (req: Request, res: Response) => {
  const schnitzelJagd = await schnitzelController.setSchnitzelJagd(req.body).catch((err) => {
    console.log(err);
    return res.status(500).json({ prismaError: err.code });
  });
  return schnitzelJagd ? res.status(200).json(schnitzelJagd) : res.sendStatus(404);
});

schnitzelRouter.put('/:id', async (req: Request, res: Response) => {
  const schnitzelJagd = await schnitzelController.updateSchnitzelJagd(req.body, req.params.id).catch((err) => {
    console.log(err);
    return res.status(500).json({ prismaError: err.code });
  });

  if (schnitzelJagd && schnitzelJagd.stack && schnitzelJagd.message) {
    return res.status(500).json({ prismaError: schnitzelJagd.code });
  }
  return schnitzelJagd ? res.status(200).json(schnitzelJagd) : res.sendStatus(404);
});

schnitzelRouter.get('/password/:password', async (req: Request, res: Response) => {
  const schnitzelJagd = await schnitzelController.getByPassword(req.params.password);
  return schnitzelJagd ? res.status(200).json(schnitzelJagd) : res.sendStatus(404);
});

schnitzelRouter.post('/template/:matNr', async (req: Request, res: Response) => {
  const schnitzelJagd = await schnitzelController.setSchnitzelJagdTemplate(parseInt(req.params.matNr));
  return schnitzelJagd ? res.status(200).json(schnitzelJagd) : res.sendStatus(404);
});
