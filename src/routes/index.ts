import express from 'express';
import { v1Routes } from './v1';

const routes = express.Router();

routes.use('/v1', v1Routes);

export default routes;
