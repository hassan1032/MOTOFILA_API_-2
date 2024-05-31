import express from "express";

import requireFieldsMiddleware from '../../middlewares/requireFieldsMiddleware';
import UserAuthController from '../../controllers/userAuth.controller';
import { userAuthFields } from '../../requiredFields';
import ParkingController from "../../controllers/parking.controller";
import BrandController from "../../controllers/brand.controller";
import ModelController from "../../controllers/model.controller";

export const userRoute = express.Router();
export const userAuthRoute = express.Router();


/****************************
    AUTH ROUTES
****************************/

userRoute.post('/register', requireFieldsMiddleware(userAuthFields.register), UserAuthController.userRegistration);

userRoute.post('/login', requireFieldsMiddleware(userAuthFields.login), UserAuthController.userLogin);

userRoute.post('/forget-password', UserAuthController.forgetPassword);
userRoute.post('/verify', UserAuthController.verifyOtp);
userRoute.post('/reset-password',requireFieldsMiddleware(userAuthFields.resetPassword) ,UserAuthController.updatePassword);

/****************************
    PARKING ROUTES
****************************/


userAuthRoute.get('/parking', ParkingController.getAllParkings);

userAuthRoute.get('/parking/:id', ParkingController.getParkingById);



/****************************
    MODEL ROUTES
****************************/

userRoute.get('/brand', BrandController.getAllBrands);

userRoute.get('/model', ModelController.getModelByBrandId);