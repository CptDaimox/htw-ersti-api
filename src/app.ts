const upload = multer();
const app: Express = express();

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

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export const handler = serverless(app);
