import { NextFunction, Request, Response } from 'express';
import UserVehicleDetailsService from '../services/userVehicleDetails.services';
import httpStatusCodes from '../statusCodes';
import statusTypes from '../statusTypes';
import { UserVehicleDetailsMessages } from '../messages';
import { authValues, generateToken } from '../auth/jwt.auth';

class UserVehicleDetailsController {
    static async getAllUserVehicleDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const userVehicleDetails = await UserVehicleDetailsService.getAllUserVehicleDetails();
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: userVehicleDetails,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: UserVehicleDetailsMessages.retrievedSuccess,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserVehicleDetailsById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userVehicleDetails = await UserVehicleDetailsService.getUserVehicleDetailsById(id);
            if (!userVehicleDetails) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: UserVehicleDetailsMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: userVehicleDetails,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: UserVehicleDetailsMessages.foundSuccess,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserVehicleDetailsByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || typeof authHeader !== 'string') {
               return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
                  data: null,
                  statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
                  type: statusTypes.FAILURE,
                  msg: 'Authorization header is missing or invalid',
               });
            }

            const userDetails: any = await authValues(authHeader);
            const  userId  = userDetails._id;
            const userVehicleDetails = await UserVehicleDetailsService.getUserVehicleDetailsByUserId(userId);
            if (!userVehicleDetails.length) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: UserVehicleDetailsMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: {token:authHeader,user: userDetails, vehicleDetails: userVehicleDetails?userVehicleDetails:null},
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: UserVehicleDetailsMessages.foundSuccess,
            });
        } catch (error) {
            next(error);
        }
    }

    static async createUserVehicleDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || typeof authHeader !== 'string') {
               return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
                  data: null,
                  statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
                  type: statusTypes.FAILURE,
                  msg: 'Authorization header is missing or invalid',
               });
            }

            const userDetails: any = await authValues(authHeader);
            const  userId  = userDetails._id;
            const { brandId, modelId, isActive, licenseNumber } = req.body;
            const newUserVehicleDetailsData = {
                userId,
                brandId,
                modelId,
                licenseNumber,
                isActive
            };

            const createdUserVehicleDetails = await UserVehicleDetailsService.createUserVehicleDetails(newUserVehicleDetailsData);
            res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({
                data: createdUserVehicleDetails,
                statusCode: httpStatusCodes.HTTP_STATUS_CREATED,
                type: statusTypes.SUCCESS,
                msg: UserVehicleDetailsMessages.createdSuccess,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateUserVehicleDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const authHeader = req.headers['authorization'];
            if (!authHeader || typeof authHeader !== 'string') {
               return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
                  data: null,
                  statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
                  type: statusTypes.FAILURE,
                  msg: 'Authorization header is missing or invalid',
               });
            }

            const userDetails: any = await authValues(authHeader);
            const  userId  = userDetails._id;
            const {  brandId, modelId, isActive, licenseNumber } = req.body;
            const newUserVehicleDetailsDataToUpdate = {
                userId,
                brandId,
                modelId,
                isActive, 
                licenseNumber
            };

            const updatedUserVehicleDetails = await UserVehicleDetailsService.updateUserVehicleDetails(id, newUserVehicleDetailsDataToUpdate);
            if (!updatedUserVehicleDetails) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: UserVehicleDetailsMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: updatedUserVehicleDetails,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: UserVehicleDetailsMessages.updatedSuccess,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUserVehicleDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedUserVehicleDetails:any = await UserVehicleDetailsService.deleteUserVehicleDetails(id);
            if (!deletedUserVehicleDetails) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: UserVehicleDetailsMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: {},
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: UserVehicleDetailsMessages.deletedSuccess,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default UserVehicleDetailsController;
