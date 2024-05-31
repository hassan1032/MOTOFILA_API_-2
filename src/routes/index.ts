import express from 'express';
import { api } from './v1';

const routes = express.Router();

routes.use('/v1', api);

export default routes;
