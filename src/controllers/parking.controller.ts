import { NextFunction, Request, Response } from 'express';
import ParkingService from '../services/parking.services';
import httpStatusCodes from '../statusCodes';
import statusTypes from '../statusTypes';
import { ParkingMessages } from '../messages';

class ParkingController {
   static async getAllParkings(req: Request, res: Response, next: NextFunction) {
      try {
         const parkings = await ParkingService.getAllParkings();
         res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            data: parkings,
            statusCode: httpStatusCodes.HTTP_STATUS_OK,
            type: statusTypes.SUCCESS,
            msg: 'Parkings retrieved successfully',
         });
      } catch (error) {
         next(error);
      }
   }

   static async getParkingById(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const parking = await ParkingService.getParkingById(id);
         if (!parking) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: ParkingMessages.notFound,
            });
         }
         res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            data: parking,
            statusCode: httpStatusCodes.HTTP_STATUS_OK,
            type: statusTypes.SUCCESS,
            msg: 'Parking found successfully',
         });
      } catch (error) {
         next(error);
      }
   }

   static async createParking(req: Request, res: Response, next: NextFunction) {
      try {
         const { name, vendorId, vendorName, location, prices, parkingImage,facality } = req.body;
         const existingParking = await ParkingService.getParkingByName(name);
         if (existingParking) {
            return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
               type: statusTypes.FAILURE,
               msg: ParkingMessages.alreadyExists,
            });
         }

         const newParkingData = {
            name,
            vendorId,
            vendorName,
            location,
            prices,
            parkingImage,
            facality
         };

         const createdParking = await ParkingService.createParking(newParkingData);
         res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({
            data: createdParking,
            statusCode: httpStatusCodes.HTTP_STATUS_CREATED,
            type: statusTypes.SUCCESS,
            msg: 'Parking created successfully',
         });
      } catch (error) {
         next(error);
      }
   }

   static async updateParking(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const { name, vendorId, vendorName, location, prices, parkingImage , facality} = req.body;
         const newParkingDataToUpdate = {
            name,
            vendorId,
            vendorName,
            location,
            prices,
            parkingImage,
            facality
         };

         const updatedParking = await ParkingService.updateParking(id, newParkingDataToUpdate);
         if (!updatedParking) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: ParkingMessages.notFound,
            });
         }
         res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            data: updatedParking,
            statusCode: httpStatusCodes.HTTP_STATUS_OK,
            type: statusTypes.SUCCESS,
            msg: 'Parking updated successfully',
         });
      } catch (error) {
         next(error);
      }
   }

   static async deleteParking(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const deletedParking: any = await ParkingService.deleteParking(id);
         if (!deletedParking) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
               data: null,
               statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
               type: statusTypes.NOT_FOUND,
               msg: ParkingMessages.notFound,
            });
         }
         res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            data: {},
            statusCode: httpStatusCodes.HTTP_STATUS_OK,
            type: statusTypes.SUCCESS,
            msg: 'Parking deleted successfully',
         });
      } catch (error) {
         next(error);
      }
   }
}

export default ParkingController;
