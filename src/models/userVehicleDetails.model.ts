import { Document, model, Schema } from 'mongoose';


export interface UserVehicleDetails extends Document {
    userId: string;
    brandId: string;
    modelId: string;
    licenseNumber: string;
    isActive: boolean;
}

const userVehicleDetailsSchema = new Schema(
    {
        userId: { type: String, required: true },
        brandId: { type: String, required: true },
        modelId: { type: String, required: true },
        licenseNumber: { type: String, required: true },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

const UserVehicleDetailsModel = model<UserVehicleDetails>('UserVehicleDetails', userVehicleDetailsSchema);

export default UserVehicleDetailsModel;
