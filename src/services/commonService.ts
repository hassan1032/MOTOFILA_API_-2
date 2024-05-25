import { Model, Document } from 'mongoose';

class GenericService<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll() {
        return await this.model.find().exec();
    }

    async getById(id: string) {
        return await this.model.findById(id).exec();
    }

    async create(data: Partial<T>) {
        const newItem = new this.model(data);
        return await newItem.save();
    }

    async update(id: string, data: Partial<T>) {
        return await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).exec();
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id).exec();
    }
}

export default GenericService;
