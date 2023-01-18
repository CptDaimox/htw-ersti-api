import express, { Express, Request, Response, urlencoded } from 'express';
import { userRouter } from './router/userRouter';
import { schnitzelRouter } from './router/schnitzelRouter';
import { gameRouter } from './router/gameRouter';
import { stationRouter } from './router/stationRouter';
import cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/schnitzel', schnitzelRouter);
app.use('/game', gameRouter);
app.use('/station', stationRouter);

app.get('/', (_req: Request, res: Response) => res.sendStatus(200));

export default app;
