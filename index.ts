import express from 'express';
import statusMonitor from 'express-status-monitor';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Application } from 'express';
import { connectDB } from './src/config/db';
import { errorHandler } from './src/middlewares/errorHandler';
import { notFoundHandler } from './src/middlewares/notFoundHandler';
import setHeaders from './src/middlewares/setheaders';
import routes from './src/routes';

dotenv.config();

connectDB();


const app: Application = express();
const port = process.env.PORT || 5000;

// Use express-status-monitor middleware
app.use(statusMonitor());

// set Headers middleware
app.use(setHeaders);

// Cors Middleware
app.use(
   cors({
      origin: '*',
   }),
);

// Middleware
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '25mb' }));


// Routes
app.use('/', routes);

// Error handling middleware
app.use(errorHandler);
app.use(notFoundHandler);

// Start server
app.listen(port as number, '0.0.0.0', () => console.log(`Server is started on port ${port}`));
