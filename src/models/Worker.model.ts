import { Document, model, Schema } from 'mongoose';

export interface Worker extends Document {
    parkingId:string;
    name: string;
    mobile: string;
    salary: string;
    dateOfJoining: string;
    aadharNo: string;
    isActive?: boolean;
    documentId: string;
    profileImg: string;
    status: string;
}

const WorkerSchema = new Schema<Worker>(
    {
        parkingId:{
            type: String,
            required: true,
        },
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
        salary: {
            type: String,
          
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
