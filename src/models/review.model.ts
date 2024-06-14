
import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  description: string;
  rating: number;
  images: string[]; 
  isActive: boolean;
  userId: mongoose.Types.ObjectId;
  parkingId: mongoose.Types.ObjectId;
}

const ReviewSchema: Schema = new Schema({
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  parkingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parking',
  }
},
{timestamps:true}

);

export default mongoose.model<IReview>('Review', ReviewSchema);
