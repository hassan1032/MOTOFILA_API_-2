import UserVehicleDetailsModel, { UserVehicleDetails } from '../models/userVehicleDetails.model';

class UserVehicleDetailsService {
    static async getAllUserVehicleDetails() {
        return UserVehicleDetailsModel.find();
    }

    static async getUserVehicleDetailsById(userVehicleDetailsId: string) {
        return UserVehicleDetailsModel.findById(userVehicleDetailsId);
    }

    static async getUserVehicleDetailsByUserId(userId: any) {
        return UserVehicleDetailsModel.find({userId});
    }
    static async createUserVehicleDetails(userVehicleDetailsData: Partial<UserVehicleDetails>) {
        return UserVehicleDetailsModel.create(userVehicleDetailsData);
    }

    static async updateUserVehicleDetails(userVehicleDetailsId: string, updateData: Partial<UserVehicleDetails>) {
        return UserVehicleDetailsModel.findByIdAndUpdate(userVehicleDetailsId, updateData, { new: true });
    }

    static async deleteUserVehicleDetails(userVehicleDetailsId: string) {
        await UserVehicleDetailsModel.findByIdAndDelete(userVehicleDetailsId);
    }
}

export default UserVehicleDetailsService;
