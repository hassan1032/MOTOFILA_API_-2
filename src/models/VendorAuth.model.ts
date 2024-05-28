import { Document, model, Schema } from 'mongoose';

export interface Vendor extends Document {
   name: string;
   mobile: string;
   email: string;
   password: string;
   confirmPassword: string;
   profileImg?: string;
   status?: boolean;
   lastOtp: string;
   isApproved: boolean;
}

const VendorSchema = new Schema<Vendor>(
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
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      password: {
         type: String,
         required: true,
      },
      profileImg: {
         type: String,
         default: '',
      },
      status: {
         type: Boolean,
         default: true,
      },
      lastOtp: {
         type: String,
         default: '',
      },
      isApproved: {
         type: Boolean,
         default: false,
      },
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

const VendorModel = model<Vendor>('Vendor', VendorSchema);

export default VendorModel;
