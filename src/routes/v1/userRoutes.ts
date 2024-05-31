import express from "express";

import requireFieldsMiddleware from '../../middlewares/requireFieldsMiddleware';
import UserAuthController from '../../controllers/userAuth.controller';
import { userAuthFields } from '../../requiredFields';
import ParkingController from "../../controllers/parking.controller";
import BrandController from "../../controllers/brand.controller";
import ModelController from "../../controllers/model.controller";
import UserVehicleDetailsController from "../../controllers/vehicleDetails.controller";
import { uploadImage } from '../../controllers/uploader.controller';
import { uploadImageMiddleware } from '../../middlewares/uploader.middleware';





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


/****************************
    USER VEHICLE DETAILS ROUTES
****************************/


userAuthRoute.post('/user-vehicle-details', UserVehicleDetailsController.createUserVehicleDetails);

userAuthRoute.get('/user-vehicle-details', UserVehicleDetailsController.getAllUserVehicleDetails);


userAuthRoute.get('/user-vehicle-details/user', UserVehicleDetailsController.getUserVehicleDetailsByUserId);

userAuthRoute.put('/user-vehicle-details/:id', UserVehicleDetailsController.updateUserVehicleDetails);

userAuthRoute.delete('/user-vehicle-details/:id', UserVehicleDetailsController.deleteUserVehicleDetails);


/****************************
    IMAGE UPLOAD ROUTES
****************************/

userAuthRoute.post('/upload/img', uploadImageMiddleware, uploadImage);
