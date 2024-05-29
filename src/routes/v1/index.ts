import express from "express";
import cors from "cors";
import { userRoute, userAuthRoute } from './userRoutes';

import { userAuthentication } from "../../auth/userAuthentication";
import { vendorAuthentication } from "../../auth/vendorAuthentication";
import { VendorRoute, VendorAuthRoute } from "./vendorRoutes";


export const api = express.Router();

api.use(cors({
  origin: true,
  credentials: true
}));



/****************************
    UNAUTHENTICATED ROUTES
****************************/
api.use('/user', userRoute);
api.use('/vendor', VendorRoute);


/****************************
  AUTHENTICATED ROUTES
****************************/

api.use('/user', userAuthentication, userAuthRoute);
api.use('/vendor', vendorAuthentication, VendorAuthRoute);

