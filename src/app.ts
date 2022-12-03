import express, { Express, Request, Response, NextFunction, urlencoded } from 'express';
import { checkUser, getUserByEmail } from './controllers/user';

const app: Express = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());

/** CORS */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.sendStatus(200);
  }
  next();
});

app.post('/login', async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    const user = await getUserByEmail(req.body.email);
    const isValid = await checkUser(user, req.body.password);
    return isValid ? res.status(200).json(user) : res.sendStatus(401);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
