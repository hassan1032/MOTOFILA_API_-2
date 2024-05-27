import VendorModel, { Vendor } from '../models/VendorAuth.model';

class VendorServices {
   static async getVendorByEmailOrMobile(mobileOrEmail: string) {
      return await VendorModel.findOne({ $or: [{ email: mobileOrEmail }, { mobile: mobileOrEmail }] }).exec();
   }

   static async getVendorByMobile(mobile: string) {
      return await VendorModel.findOne({ mobile: mobile }).exec();
   }
   static async getVendorById(id: string) {
      return await VendorModel.findById(id).exec();
   }

   static async createVendor(vendorData: Partial<Vendor>) {
      const newVendor = new VendorModel(vendorData);
      return await newVendor.save();
   }

   static async updateVendor(id: string, vendorData: Partial<Vendor>) {
      return await VendorModel.findByIdAndUpdate(id, vendorData, {
         new: true,
         runValidators: true,
      }).exec();
   }

   static async deleteVendor(id: string) {
      await VendorModel.findByIdAndDelete(id).exec();
   }

   static async updateLastOtp(vendorId: any, otp: string): Promise<void> {
      await VendorModel.findByIdAndUpdate(vendorId, { 'lastOtp': otp }).exec();
   }
}

export default VendorServices;
