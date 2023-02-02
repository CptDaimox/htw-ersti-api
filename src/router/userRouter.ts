import express, { Request, Response } from 'express';
import * as userController from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/login/:username/:password', async (req: Request, res: Response) => {
  if (req.params.username && req.params.password) {
    const user = await userController.getUserByEmail(req.params.username);
    const isValid = await userController.checkUser(user, req.params.password);
    return isValid ? res.status(200).json(user) : res.sendStatus(404);
  }
});

userRouter.get('/:email', async (req: Request, res: Response) => {
  if (req.params.email) {
    const user = await userController.getUserByEmail(req.params.email);
    return user ? res.status(200).json(user) : res.sendStatus(404);
  }
});

userRouter.put('/join/:password/:userId', async (req: Request, res: Response) => {
  if (req.params.password && req.params.userId) {
    const schnitzelJagd = await userController.joinSchnitzelJagd(req.params.password, parseInt(req.params.userId));
    return schnitzelJagd ? res.status(200).json(schnitzelJagd) : res.sendStatus(404);
  }
});

userRouter.put('/joinGroup/:groupId/:userId', async (req: Request, res: Response) => {
  if (req.params.groupId && req.params.userId) {
    const schnitzelJagd = await userController.joinGroup(parseInt(req.params.groupId), parseInt(req.params.userId));
    return schnitzelJagd ? res.status(200).json(schnitzelJagd) : res.sendStatus(404);
  }
});