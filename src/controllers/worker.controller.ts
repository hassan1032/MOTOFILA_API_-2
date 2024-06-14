import { NextFunction, Request, Response } from 'express';
import WorkerServices from '../services/worker.services';
import httpStatusCodes from '../statusCodes';
import statusTypes from '../statusTypes';
import { WorkerMessages } from '../messages';

class WorkerAuthController {
    static async getAllWorkers(req: Request, res: Response, next: NextFunction) {
        try {
            const workers = await WorkerServices.getAllWorkers();
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: workers,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: 'Workers retrieved successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    static async getWorkerById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const worker = await WorkerServices.getWorkerById(id);
            if (!worker) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: WorkerMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: worker,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: 'Worker found successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    static async createWorker(req: Request, res: Response, next: NextFunction) {
        try {
            const { parkingId, name, mobile, salary, dateOfJoining, aadharNo, documentId, profileImg, status } = req.body;
            console.log("body>>>",req.body)
            const existingWorker = await WorkerServices.getWorkerByMobile(mobile);
            if (existingWorker) {
                return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
                    type: statusTypes.FAILURE,
                    msg: WorkerMessages.alreadyExists,
                });
            }

            const newWorkerData = {
                parkingId, name, mobile, salary, dateOfJoining, aadharNo, documentId, profileImg, status
            };
            console.log("worker",newWorkerData);
            

            const createdWorker = await WorkerServices.createWorker(newWorkerData);
            res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({
                data: createdWorker,
                statusCode: httpStatusCodes.HTTP_STATUS_CREATED,
                type: statusTypes.SUCCESS,
                msg: 'Worker created successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateWorker(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { parkingId, name, mobile, salary, dateOfJoining, aadharNo, documentId, profileImg, isActive, status } = req.body;
            const newWorkerDataToUpdate = {
                parkingId, name, mobile, salary, dateOfJoining, aadharNo, documentId, profileImg, isActive, status
            };

            const updatedWorker = await WorkerServices.updateWorker(id, newWorkerDataToUpdate);
            if (!updatedWorker) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: WorkerMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: updatedWorker,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: 'Worker updated successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteWorker(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedWorker: any = await WorkerServices.deleteWorker(id);
            if (!deletedWorker) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: WorkerMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: {},
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: 'Worker deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default WorkerAuthController;
