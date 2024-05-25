import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import VendorServices from '../services/vendorAuth.services';
import httpStatusCodes from '../statusCodes';
import statusTypes from '../statusTypes';
import { VendorAuthMessages } from '../messages';
import { generateToken } from '../auth/jwt.auth';

class VendorAuthController {
   static async vendorRegistration(req: Request, res: Response, next: NextFunction) {
      try {
         const { name, mobile, email, password } = req.body;
         const existingVendor = await VendorServices.getVendorByEmailOrMobile(email);
         if (existingVendor) {
            return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
               type: statusTypes.FAILURE,
               msg: VendorAuthMessages.alreadyExists,
            });
         }

         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(password, saltRounds);

         const newVendorData = {
            name,
            mobile,
            email,
            password: hashedPassword,
         };

         const createdVendor = await VendorServices.createVendor(newVendorData);
         res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({
            data: createdVendor,
            statusCode: httpStatusCodes.HTTP_STATUS_CREATED,
            type: statusTypes.SUCCESS,
            msg: VendorAuthMessages.registered,
         });
      } catch (error) {
         next(error);
      }
   }

   static async vendorLogin(req: Request, res: Response, next: NextFunction) {
      try {
         const { mobile, password } = req.body;
         const vendor = await VendorServices.getVendorByMobile(mobile);
         if (!vendor) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: VendorAuthMessages.notFound,
            });
         }

         const passwordMatch = await bcrypt.compare(password, vendor.password);
         if (!passwordMatch) {
            return res.status(httpStatusCodes.HTTP_STATUS_UNAUTHORIZED).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_UNAUTHORIZED,
               type: statusTypes.UNAUTHORIZED,
               msg: VendorAuthMessages.loginFail,
            });
         }
         const token = generateToken({ vendorId: vendor?._id, role: 'vendor' });
         res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            data: token,
            statusCode: httpStatusCodes.HTTP_STATUS_OK,
            type: statusTypes.SUCCESS,
            msg: VendorAuthMessages.loginSuccess,
         });
      } catch (error) {
         next(error);
      }
   }
}

export default VendorAuthController;
