import express from 'express';

import requireFieldsMiddleware from '../../middlewares/requireFieldsMiddleware';
import UserAuthController from '../../controllers/userAuth.controller';
import { userAuthFields } from '../../requiredFields';
import ParkingController from '../../controllers/parking.controller';
import BrandController from '../../controllers/brand.controller';
import ModelController from '../../controllers/model.controller';
import UserVehicleDetailsController from '../../controllers/vehicleDetails.controller';
import { uploadImage } from '../../controllers/uploader.controller';
import { uploadImageMiddleware } from '../../middlewares/uploader.middleware';
import {
   createReview,
   getAllReviews,
   getReviewById,
   updateReview,
   deleteReview,
} from '../../controllers/review.controller';
import {
   createComplaint,
   getAllComplaints,
   getComplaint,
   updateComplaint,
   deleteComplaint,
} from '../../controllers/complain.controller';
import { createNotification,getAllNotifications,getNotificationById ,updateNotificationById,deleteNotificationById} from '../../controllers/user.notification.controller';

export const userRoute = express.Router();
export const userAuthRoute = express.Router();

/****************************
    AUTH ROUTES
****************************/

userRoute.post('/register', requireFieldsMiddleware(userAuthFields.register), UserAuthController.userRegistration);

userRoute.post('/login', requireFieldsMiddleware(userAuthFields.login), UserAuthController.userLogin);

userRoute.post('/forget-password', UserAuthController.forgetPassword);
userRoute.post('/verify', UserAuthController.verifyOtp);
userRoute.post(
   '/reset-password',
   requireFieldsMiddleware(userAuthFields.resetPassword),
   UserAuthController.updatePassword,
);

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

//   USER REVIEW ROUTES :::::::::::::::::::: START::

// create review:
userAuthRoute.post('/review', createReview);
// get all reviews:
userRoute.get('/get-review', getAllReviews);
// get review by id:
userRoute.get('/get-review/:id', getReviewById);
// update review:
userAuthRoute.put('/update-review/:id', updateReview);
// delete review:
userAuthRoute.delete('/delete-review/:id', deleteReview);

//USER REVIEW ROUTES :::::::::::::::::::: END

// THE ROUTE IS START COMPLAIN::::::::
// create complain:
userAuthRoute.post('/complain', createComplaint);
// get all complains:
userRoute.get('/get-complain', getAllComplaints);
// get complain by id:
userRoute.get('/get-complain/:id', getComplaint);
// update complain:
userAuthRoute.put('/update-complain/:id', updateComplaint);
// delete complain:
userAuthRoute.delete('/delete-complain/:id', deleteComplaint);

// THE ROUTE IS END COMPLAIN::::::::


// THE ROUTE  USER NOTIFICATION START :::
// create notification:
userAuthRoute.post('/notification', createNotification);
// get all notifications:
userAuthRoute.get('/get-notification', getAllNotifications);
// get notification by id:
userAuthRoute.get('/get-notification/:id', getNotificationById);
// update notification:
userAuthRoute.put('/update-notification/:id', updateNotificationById);
// delete notification:
userAuthRoute.delete('/delete-notification/:id', deleteNotificationById);


// THE ROUTE  USER NOTIFICATION END:::