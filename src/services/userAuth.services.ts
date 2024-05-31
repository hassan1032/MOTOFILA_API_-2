import UserModel, { User } from '../models/UserModel';

class UserServices {
   static async getUserByEmailOrMobile(mobileOrEmail: string) {
      return await UserModel.findOne({ $or: [{ email: mobileOrEmail }, { mobile: mobileOrEmail }] }).exec();
   }

   static async getUserByMobile(mobile: string) {
      return await UserModel.findOne({ mobile: mobile }).exec();
   }
   
   static async getUserById(id: string) {
      return await UserModel.findById(id).exec();
   }

   static async createUser(userData: Partial<User>) {
      const newUser = new UserModel(userData);
      return await newUser.save();
   }

   static async updateUser(id: string, userData: Partial<User>) {
      return await UserModel.findByIdAndUpdate(id, userData, {
         new: true,
         runValidators: true,
      }).exec();
   }

   static async deleteUser(id: string) {
      await UserModel.findByIdAndDelete(id).exec();
   }

   static async updateLastOtp(userId: any, otp: string): Promise<void> {
      await UserModel.findByIdAndUpdate(userId, { 'lastOtp': otp }).exec();
   }
}

export default UserServices;
