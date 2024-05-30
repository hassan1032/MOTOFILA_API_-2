import { Document, model, Schema } from 'mongoose';

export interface Model extends Document {
    brandId: string;
    name: string;
    slug: string;
    segment:string;
    isActive?: boolean;
}

const modelSchema = new Schema({
    brandId: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    segment: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const VehicleModel = model<Model>('VehicleModel', modelSchema);

export default VehicleModel;
