import { Document, model, Schema } from 'mongoose';

export interface Parking extends Document {
   name: string;
   vendorId: string;
   vendorName: string;
   location: string;
   prices: {
      vehicleType: string;
      price: string;
      totalSlot: string;
      availableSlot: string;
      bookedSlot: string;
      reservedSlot: string;
      extraPricePerHour: string;
   }[];
   parkingImage: string;
   facality: [];
}

const priceSchema = new Schema(
   {
      vehicleType: { type: String, required: true },
      price: { type: String, required: true },
      totalSlot: { type: String, required: true },
      availableSlot: { type: String, required: true },
      bookedSlot: { type: String, required: true },
      reservedSlot: { type: String, required: true },
      extraPricePerHour: { type: String, required: true },
   },
   { _id: false },
);

const parkingSchema = new Schema(
   {
      name: { type: String, required: true },
      vendorId: { type: String, required: true },
      vendorName: { type: String, required: true },
      location: { type: String, required: true },
      prices: { type: [priceSchema], required: true },
      parkingImage: { type: String, required: true },
      facality: { type: [] },
   },
   { timestamps: true },
);

const ParkingModel = model<Parking>('Parking', parkingSchema);

export default ParkingModel;
