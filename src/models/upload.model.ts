import { Schema, model, Document, Types } from 'mongoose';

export interface IUpload extends Document {
    fileName: string;
    filePath: string;
    uploadedBy: Types.ObjectId | null;
}

const uploadSchema = new Schema<IUpload>({
    fileName: { type: String, index: true },
    filePath: { type: String },
    uploadedBy: { type: Schema.Types.ObjectId, default: null, index: true },
}, { timestamps: true });

const UploadModel = model<IUpload>('Upload', uploadSchema);
export default UploadModel;
