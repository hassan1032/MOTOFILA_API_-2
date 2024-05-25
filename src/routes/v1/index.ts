import express from 'express';
import { vendorAuthRoute } from './vendorAuth.routes';


const routes = express.Router();

routes.use('/vendor-auth', vendorAuthRoute);


export { routes as v1Routes };

