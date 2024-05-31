import express from "express";
import WorkerAuthController from '../../controllers/worker.controller';
import requireFieldsMiddleware from '../../middlewares/requireFieldsMiddleware';
import { userAuthFields, workerFields, parkingFields } from '../../requiredFields';
import UserAuthController from "../../controllers/userAuth.controller";
import ParkingController from "../../controllers/parking.controller";
import { uploadPdfMiddleware } from "../../middlewares/uploader.middleware";
import { uploadPdf } from "../../controllers/uploader.controller";


export const VendorRoute = express.Router();
export const VendorAuthRoute = express.Router();


/****************************
    AUTH ROUTES
****************************/

VendorRoute.post('/register', requireFieldsMiddleware(userAuthFields.register), UserAuthController.userRegistration);

VendorRoute.post('/login', requireFieldsMiddleware(userAuthFields.login), UserAuthController.userLogin);

VendorRoute.post('/forget-password', UserAuthController.forgetPassword);
VendorRoute.post('/verify', UserAuthController.verifyOtp);
VendorRoute.post('/reset-password', requireFieldsMiddleware(userAuthFields.resetPassword), UserAuthController.updatePassword);


/****************************
    WORKER ROUTES
****************************/

VendorAuthRoute.get('/worker', WorkerAuthController.getAllWorkers);

VendorAuthRoute.get('/worker/:id', WorkerAuthController.getWorkerById);

VendorAuthRoute.post('/worker', requireFieldsMiddleware(workerFields.create), WorkerAuthController.createWorker);

VendorAuthRoute.put('/worker/:id', requireFieldsMiddleware(workerFields.update), WorkerAuthController.updateWorker);

VendorAuthRoute.delete('/worker/:id', WorkerAuthController.deleteWorker);



/****************************
    PARKING ROUTES
****************************/

VendorAuthRoute.get('/', ParkingController.getAllParkings);

VendorAuthRoute.get('/:id', ParkingController.getParkingById);

VendorAuthRoute.post('/', requireFieldsMiddleware(parkingFields.create), ParkingController.createParking);

VendorAuthRoute.put('/:id', requireFieldsMiddleware(parkingFields.update), ParkingController.updateParking);

VendorAuthRoute.delete('/:id', ParkingController.deleteParking);


/****************************
     UPLOAD PDF ROUTES
****************************/

VendorAuthRoute.post('/upload/pdf', uploadPdfMiddleware, uploadPdf);