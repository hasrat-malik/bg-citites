import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cityRoutes from './routes/cityRoutes';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', cityRoutes);

// error handler middleware
app.use(errorHandler);

export default app;
