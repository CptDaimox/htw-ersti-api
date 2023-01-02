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
