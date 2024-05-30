import { NextFunction, Request, Response } from 'express';
import BrandService from '../services/brand.services';
import httpStatusCodes from '../statusCodes';
import statusTypes from '../statusTypes';
import { BrandMessages } from '../messages';

class BrandController {
    static async getAllBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const brands = await BrandService.getAllBrands();
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: brands,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: BrandMessages.retrievedSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getBrandById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const brand = await BrandService.getBrandById(id);
            if (!brand) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: BrandMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: brand,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: BrandMessages.foundSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }

    static async createBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, slug, isActive } = req.body;
            const existingBrand = await BrandService.getBrandByName(name);
            if (existingBrand) {
                return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
                    type: statusTypes.FAILURE,
                    msg: BrandMessages.alreadyExists,
                });
            }

            const newBrandData = {
                name, slug, isActive
            };

            const createdBrand = await BrandService.createBrand(newBrandData);
            res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({
                data: createdBrand,
                statusCode: httpStatusCodes.HTTP_STATUS_CREATED,
                type: statusTypes.SUCCESS,
                msg: BrandMessages.createdSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, slug, isActive } = req.body;
            const newBrandDataToUpdate = {
                name, slug, isActive
            };

            const updatedBrand = await BrandService.updateBrand(id, newBrandDataToUpdate);
            if (!updatedBrand) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: BrandMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: updatedBrand,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: BrandMessages.updatedSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedBrand: any = await BrandService.deleteBrand(id);
            if (!deletedBrand) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: BrandMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: {},
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: BrandMessages.deletedSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default BrandController;
