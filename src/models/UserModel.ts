import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
   name: string;
   mobile: string;
   email: string;
   password: string;
   confirmPassword: string;
   profileImg?: string;
   status?: boolean;
   lastOtp: string;
   isApproved: boolean;
   userType: string;
}

const UserSchema = new Schema<User>(
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
      userType: {
         type: String,
         required: true,
         enum: ['vendor', 'customer', 'admin'], 
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

const UserModel = model<User>('User', UserSchema);

export default UserModel;
