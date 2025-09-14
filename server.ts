import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectMongo } from './mongo';
import { swaggerDocs } from './swagger.js';

import verdictRoutes from './routes/verdictRoutes';
import userRoutes from './routes/userRoutes';
import notifyRoutes from './routes/notifyRoutes';
import authGoogle from './routes/authGoogle';
import exportCSV from './routes/exportCSV';

dotenv.config();

const app = express();

// ? Connect to MongoDB
connectMongo();

// ? Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ? Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Metaflow backend is live. Tracking engine operational.');
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date(),
  });
});

app.use('/verdict', verdictRoutes);
app.use('/user', userRoutes);
app.use('/notify', notifyRoutes);
app.use('/auth/google', authGoogle);
app.use('/export/csv', exportCSV);

// ? Swagger Docs
swaggerDocs(app);

// ? Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('? Backend Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ? Launch
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(?? Verdict Engine API running at http://localhost:);
});
