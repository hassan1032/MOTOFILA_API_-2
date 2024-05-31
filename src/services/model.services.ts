import VehicleModel, { Model } from '../models/model.model'

class ModelService {
    static async getAllModels() {
        return VehicleModel.find();
    }
    static async getModelById(modelId: string) {
        return VehicleModel.findById(modelId);
    }
    static async getModelByName(name: string) {
        return VehicleModel.findOne({ name: name });
    }
    static async createModel(modelData: any) {
        return VehicleModel.create(modelData);
    }
    static async updateModel(modelId: string, updateData: any) {
        return VehicleModel.findByIdAndUpdate(modelId, updateData, { new: true });
    }
    static async deleteModel(modelId: string) {
        await VehicleModel.findByIdAndDelete(modelId);
    }
    static async getModelsByBrandId(brandId: string) {
        return VehicleModel.find({ brandId: brandId });
    }
}

export default ModelService;
