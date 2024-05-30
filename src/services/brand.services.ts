import BrandModel, { Brand } from '../models/brand.model'

class BrandService {
    static async getAllBrands() {
        return BrandModel.find();
    }

    static async getBrandById(brandId: string) {
        return BrandModel.findById(brandId);
    }

    static async getBrandByName(name: string) {
        return BrandModel.findOne({ name: name });
    }

    static async createBrand(brandData: any) {
        return BrandModel.create(brandData);
    }

    static async updateBrand(brandId: string, updateData: any) {
        return BrandModel.findByIdAndUpdate(brandId, updateData, { new: true });
    }

    static async deleteBrand(brandId: string) {
        await BrandModel.findByIdAndDelete(brandId);
    }
}

export default BrandService;
