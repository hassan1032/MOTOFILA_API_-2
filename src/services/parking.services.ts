import ParkingModel from "../models/Parking.model";

class ParkingService {
    static async getAllParkings() {
        return ParkingModel.find();
    }
    static async getParkingById(parkingId: string) {
        return ParkingModel.findById(parkingId);
    }
    static async getParkingByName(name: string) {
        return ParkingModel.findOne({ name: name });
    }
    static async createParking(parkingData: any) {
        return ParkingModel.create(parkingData);
    }
    static async updateParking(parkingId: string, updateData: any) {
        return ParkingModel.findByIdAndUpdate(parkingId, updateData, { new: true });
    }
    static async deleteParking(parkingId: string) {
        await ParkingModel.findByIdAndDelete(parkingId);
    }
}

export default ParkingService;