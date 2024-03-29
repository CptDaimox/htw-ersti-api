import express, { Express, Request, Response, NextFunction, urlencoded } from 'express';
import { userRouter } from './router/userRouter';
import { schnitzelRouter } from './router/schnitzelRouter';
import { gameRouter } from './router/gameRouter';
import { stationRouter } from './router/stationRouter';
import { schnitzelGroupRouter } from './router/schnitzelGroupRouter';

const app: Express = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
/** CORS */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use('/user', userRouter);
app.use('/schnitzel', schnitzelRouter);
app.use('/game', gameRouter);
app.use('/station', stationRouter);
app.use('/schnitzelGroup', schnitzelGroupRouter);

app.get('/', (_req: Request, res: Response) => res.sendStatus(200));

export default app;
