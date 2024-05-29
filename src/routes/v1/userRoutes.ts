import express from "express";

import requireFieldsMiddleware from '../../middlewares/requireFieldsMiddleware';
import UserAuthController from '../../controllers/userAuth.controller';
import { userAuthFields } from '../../requiredFields';
import WorkerAuthController from "../../controllers/worker.controller";
import ParkingController from "../../controllers/parking.controller";

export const userRoute = express.Router();
export const userAuthRoute = express.Router();


/****************************
    AUTH ROUTES
****************************/

userRoute.post('/register', requireFieldsMiddleware(userAuthFields.register), UserAuthController.userRegistration);

userRoute.post('/login', requireFieldsMiddleware(userAuthFields.login), UserAuthController.userLogin);

userRoute.post('/forget-password', UserAuthController.forgetPassword);
userRoute.post('/verify', UserAuthController.verifyOtp);


/****************************
    PARKING ROUTES
****************************/


userAuthRoute.get('/', ParkingController.getAllParkings);

userAuthRoute.get('/:id', ParkingController.getParkingById);

