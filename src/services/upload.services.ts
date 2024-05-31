import UploadModel, { IUpload } from '../models/upload.model';

class UploadService {
    static async getAllUploads() {
        return UploadModel.find();
    }

    static async getUploadById(uploadId: string) {
        return UploadModel.findById(uploadId);
    }

    static async createUpload(uploadData: any) {
        return UploadModel.create(uploadData);
    }

    static async deleteUpload(uploadId: string) {
        await UploadModel.findByIdAndDelete(uploadId);
    }
}

export default UploadService;
