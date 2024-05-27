import WorkerModel from '../models/Worker.model';

class WorkerService {
    static async getAllWorkers() {
        return WorkerModel.find();
    }

    static async getWorkerByMobile(mobile: string) {
        return await WorkerModel.findOne({ mobile }).exec();

    }


    static async getWorkerById(workerId: string) {
        return WorkerModel.findById(workerId);
    }
    static async createWorker(workerData: any) {
        return WorkerModel.create(workerData);
    }

    static async updateWorker(workerId: string, updateData: any) {
        return WorkerModel.findByIdAndUpdate(workerId, updateData, { new: true });
    }

    static async deleteWorker(workerId: string) {
        await WorkerModel.findByIdAndDelete(workerId);
    }
}

export default WorkerService;
