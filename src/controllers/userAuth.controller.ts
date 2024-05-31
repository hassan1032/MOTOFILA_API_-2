import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserServices from '../services/userAuth.services';
import httpStatusCodes from '../statusCodes';
import statusTypes from '../statusTypes';
import { UserAuthMessages } from '../messages';
import { authValues, generateToken } from '../auth/jwt.auth';
import { generateOTP } from '../helper';
import { sendMailOtpVerification } from '../config/mailer';

class UserAuthController {
   static async userRegistration(req: Request, res: Response, next: NextFunction) {
      try {
         const { name, mobile, email, password , userType} = req.body;
         const existingUser = await UserServices.getUserByEmailOrMobile(email);
         if (existingUser) {
            return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
               type: statusTypes.FAILURE,
               msg: UserAuthMessages.alreadyExists,
            });
         }

         const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(password, saltRounds);

         const newUserdata = {
            name,
            mobile,
            email,
            password: hashedPassword,
            userType: userType,
         };

         const createdUser = await UserServices.createUser(newUserdata);
         const otp = generateOTP();
         const to = createdUser?.email;
         const subject = 'OTP verification';
         const data = {
            otp: otp,
         };
         if (createdUser?.email) {
            await sendMailOtpVerification(to, subject, data);
            await UserServices.updateLastOtp(createdUser?._id, otp);
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_OK,
               msg: UserAuthMessages.otpSent,
            });
         }
      } catch (error) {
         next(error);
      }
   }

   static async userLogin(req: Request, res: Response, next: NextFunction) {
      try {
         const { email,mobile, password } = req.body;
         const user = await UserServices.getUserByEmailOrMobile(email || mobile);
         if (!user) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: UserAuthMessages.notFound,
            });
         }
         if (!user?.isApproved) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: UserAuthMessages.notVerified,
            });
         }

         const passwordMatch = await bcrypt.compare(password, user.password);
         if (!passwordMatch) {
            return res.status(httpStatusCodes.HTTP_STATUS_FORBIDDEN).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_FORBIDDEN,
               type: statusTypes.UNAUTHORIZED,
               msg: UserAuthMessages.loginFail,
            });
         }
        
         const token = generateToken({ userId: user?._id }); 
         res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            data: {token:token,user: user},
            statusCode: httpStatusCodes.HTTP_STATUS_OK,
            type: statusTypes.SUCCESS,
            msg: UserAuthMessages.loginSuccess,
         });
        
      } catch (error) {
         next(error);
      }
   }

   static async forgetPassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, mobile } = req.body;
         const user = await UserServices.getUserByEmailOrMobile(email || mobile);
         if (!user) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: UserAuthMessages.notFound,
            });
         }
         const otp = generateOTP();
         const to = user?.email;
         const subject = 'OTP verification';
         const data = {
            otp: otp,
         };
         if (email) {
            await sendMailOtpVerification(to, subject, data);
            await UserServices.updateLastOtp(user?._id, otp);
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_OK,
               msg: UserAuthMessages.otpSent,
            });
         } else if (mobile) {
            // otp send by the mobile (This part needs an SMS sending implementation)
            await UserServices.updateLastOtp(user?._id, otp);
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_OK,
               msg: UserAuthMessages.otpSent,
            });
         }
      } catch (error) {
         next(error);
      }
   }

   static async verifyOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, mobile, otp } = req.body;
         const user = await UserServices.getUserByEmailOrMobile(email || mobile);
         if (!user) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: UserAuthMessages.notFound,
            });
         }

         if (user.lastOtp !== otp) {
            return res.status(httpStatusCodes.HTTP_STATUS_FORBIDDEN).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_FORBIDDEN,
               type: statusTypes.UNAUTHORIZED,
               msg: UserAuthMessages.invalidOtp,
            });
         }

         const token = generateToken({ userId: user._id });
         await UserServices.updateUser(user?._id, {isApproved:true});
         res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            data: token,
            statusCode: httpStatusCodes.HTTP_STATUS_OK,
            type: statusTypes.SUCCESS,
            msg: UserAuthMessages.otpVerified,
         });
      } catch (error) {
         next(error);
      }
   }

   static async updatePassword(req: Request, res: Response, next: NextFunction) {
      try {
         const userDetails: any = await authValues(req?.body?.token);
         const userId = userDetails?._id;
         const { password } = req.body;
         if (!userId) {
            return res.status(httpStatusCodes.HTTP_STATUS_UNAUTHORIZED).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_UNAUTHORIZED,
               type: statusTypes.UNAUTHORIZED,
               msg: 'User not authenticated',
            });
         }

         const user = await UserServices.getUserById(userId);
         if (!user) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: UserAuthMessages.notFound,
            });
         }

         const saltRounds = 10;
         const hashedNewPassword = await bcrypt.hash(password, saltRounds);
         await UserServices.updateUser(userId, { password: hashedNewPassword });

         res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            data: null,
            statusCode: httpStatusCodes.HTTP_STATUS_OK,
            type: statusTypes.SUCCESS,
            msg: UserAuthMessages.passwordUpdated,
         });
      } catch (error) {
         next(error);
      }
   }
}



export default UserAuthController;
