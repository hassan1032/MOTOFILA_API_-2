import { NextFunction, Request, Response } from 'express';
import ModelService from '../services/model.services';
import httpStatusCodes from '../statusCodes';
import statusTypes from '../statusTypes';
import { ModelMessages } from '../messages';

class ModelController {
    static async getAllModels(req: Request, res: Response, next: NextFunction) {
        try {
            const models = await ModelService.getAllModels();
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: models,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: ModelMessages.retrievedSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getModelById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const model = await ModelService.getModelById(id);
            if (!model) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: ModelMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: model,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: ModelMessages.foundSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getModelByBrandId(req: Request, res: Response, next: NextFunction) {
        try {
            const brandId:any  = req.query.brandId;
            const models = await ModelService.getModelsByBrandId(brandId);
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: models,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: ModelMessages.retrievedByBrandIdSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }
    static async createModel(req: Request, res: Response, next: NextFunction) {
        try {
            const { brandId, name, slug, segment } = req.body;
            const existingModel = await ModelService.getModelByName(name);
            if (existingModel) {
                return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
                    type: statusTypes.FAILURE,
                    msg: ModelMessages.alreadyExists,
                });
            }

            const newModelData = {
                brandId, name, slug, segment
            };

            const createdModel = await ModelService.createModel(newModelData);
            res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({
                data: createdModel,
                statusCode: httpStatusCodes.HTTP_STATUS_CREATED,
                type: statusTypes.SUCCESS,
                msg: ModelMessages.createdSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateModel(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { brandId, name, slug, segment } = req.body;
            const newModelDataToUpdate = {
                brandId, name, slug, segment
            };

            const updatedModel = await ModelService.updateModel(id, newModelDataToUpdate);
            if (!updatedModel) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: ModelMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: updatedModel,
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: ModelMessages.updatedSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteModel(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedModel: any = await ModelService.deleteModel(id);
            if (!deletedModel) {
                return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                    data: null,
                    statusCode: httpStatusCodes.HTTP_STATUS_NOT_FOUND,
                    type: statusTypes.NOT_FOUND,
                    msg: ModelMessages.notFound,
                });
            }
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                data: {},
                statusCode: httpStatusCodes.HTTP_STATUS_OK,
                type: statusTypes.SUCCESS,
                msg: ModelMessages.deletedSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ModelController;
