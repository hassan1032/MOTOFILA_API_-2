import { Document, model, Schema } from 'mongoose';

export interface Brand extends Document {
    brandId: string;
    name: string;
    slug: string;
    isActive?: boolean;
}

const brandSchema = new Schema({
    brandId: { type: String },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const BrandModel = model<Brand>('Brand', brandSchema);

export default BrandModel;
