import { Document, model, Schema } from 'mongoose';
import { User } from './UserModel'; 

const ComplaintSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    minlength: [5, 'Description must be at least 5 characters long'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'] 
  },
  message: { type: String, required: true }
}, 
{
  timestamps: {
    currentTime() {
       const indianTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
       return new Date(indianTime);
    }
  }
});

interface IComplaint extends Document {
  userId: User['_id']; 
  description: string;
  message: string;
}

const ComplaintModel = model<IComplaint>('Complaint', ComplaintSchema); 

export { ComplaintModel, IComplaint };
