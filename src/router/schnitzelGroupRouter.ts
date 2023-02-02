import express, { Request, Response } from 'express';
import * as schnitzelGroupController from '../controllers/schnitzelGroup';

export const schnitzelGroupRouter = express.Router();

schnitzelGroupRouter.get('/:id?', async (req: Request, res: Response) => {
  if (req.params.id && !isNaN(parseInt(req.params.id))) {
    const schnitzelId = parseInt(req.params.id);
    const schnitzelGroup = await schnitzelGroupController.getGroupById(schnitzelId);
    return schnitzelGroup ? res.status(200).json(schnitzelGroup) : res.sendStatus(404);
  } else {
    const schnitzelGroup = await schnitzelGroupController.getAllGroups();
    return schnitzelGroup ? res.status(200).json(schnitzelGroup) : res.sendStatus(404);
  }
});

schnitzelGroupRouter.get('/leader/:id', async (req: Request, res: Response) => {
  const leaderId = req.params.id;
  const schnitzelGroup = await schnitzelGroupController.getGroupByLeaderId(parseInt(leaderId));
  return schnitzelGroup ? res.status(200).json(schnitzelGroup) : res.sendStatus(404);
});

schnitzelGroupRouter.get('/members/:id', async (req: Request, res: Response) => {
  const schnitzelId = req.params.id;
  if (isNaN(parseInt(schnitzelId))) return res.sendStatus(404);
  const schnitzelGroup = await schnitzelGroupController.getGroupMembers(parseInt(schnitzelId));
  return schnitzelGroup ? res.status(200).json(schnitzelGroup) : res.sendStatus(404);
});

schnitzelGroupRouter.post('/', async (req: Request, res: Response) => {
  const schnitzelGroup = await schnitzelGroupController
    .setSchnitzelGroup(req.body.groupLeaderId, req.body.groupName, req.body.schnitzeljagdPw)
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ prismaError: err.code });
    });
  return schnitzelGroup ? res.status(200).json(schnitzelGroup) : res.sendStatus(404);
});

schnitzelGroupRouter.put('/:id', async (req: Request, res: Response) => {
  const schnitzelGroup = await schnitzelGroupController
    .updateGroup(parseInt(req.params.id), req.body.groupName)
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ prismaError: err.code });
    });

  if (schnitzelGroup && schnitzelGroup.stack && schnitzelGroup.message) {
    return res.status(500).json({ prismaError: schnitzelGroup.code });
  }
  return schnitzelGroup ? res.status(200).json(schnitzelGroup) : res.sendStatus(404);
});

schnitzelGroupRouter.get('/password/:password', async (req: Request, res: Response) => {
  const schnitzelGroup = await schnitzelGroupController.getByPassword(req.params.password);
  return schnitzelGroup ? res.status(200).json(schnitzelGroup) : res.sendStatus(404);
});
