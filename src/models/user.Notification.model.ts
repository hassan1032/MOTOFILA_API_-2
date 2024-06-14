import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
   event: string;
   message: string;
   sentBy: string;
   seen: boolean;
   time: Date;
   date: Date;
   isActive: boolean;
   userId: mongoose.Types.ObjectId;
   images: string[];
}

const NotificationSchema: Schema<INotification> = new Schema(
   {
      event: {
         type: String,
         required: true,
      },
      message: {
         type: String,
         required: true,
      },
      sentBy: {
         type: String,
         required: true,
      },
      seen: {
         type: Boolean,
         required: true,
      },
      time: {
         type: Date,
         required: true,
      },
      date: {
         type: Date,
         required: true,
      },
      isActive: {
         type: Boolean,
         default: true,
      },
      images: {
         type: [String],
         required: true,
      },
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
   },
   { timestamps: true },
);

export default mongoose.model<INotification>('Notification', NotificationSchema);
