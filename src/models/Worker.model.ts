import { Document, model, Schema } from 'mongoose';

export interface Worker extends Document {
    name: string;
    mobile: string;
    salery: string;
    dateOfJoining: string;
    aadharNo: string;
    isActive?: boolean;
    documentId: string;
    profileImg: string;
    status: string;
}

const WorkerSchema = new Schema<Worker>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        salery: {
            type: String,
            required: true,
        },
        dateOfJoining: {
            type: String,
            required: true,
        },
        aadharNo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        documentId: {
            type: String,
            required: true,
        },
        profileImg: {
            type: String,
            default: '',
        },
        status: {
            type: String
        }
    },
    {
        timestamps: {
            currentTime() {
                const indianTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
                return new Date(indianTime);
            },
        },
    },
);

const WorkerModel = model<Worker>('Worker', WorkerSchema);

export default WorkerModel;
