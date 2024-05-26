import express from 'express';
import { vendorAuthRoute } from './vendorAuth.routes';
import { workerAuthRoute } from './worker.routes';

const routes = express.Router();

routes.use('/vendor-auth', vendorAuthRoute);
routes.use('/worker', workerAuthRoute);

export { routes as v1Routes };
