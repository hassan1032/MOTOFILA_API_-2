import fs from 'fs';
import { connectDB, disconnectDB } from '../config/db';

import VehicleModel, { Model } from '../models/model.model';

export const addModels = async (): Promise<void> => {
    await connectDB();
    try {

        const modelData = JSON.parse(fs.readFileSync('src/seeder/data/all_models.json', 'utf-8'));
        for (const model of modelData) {
            const existingModel: Model | null = await VehicleModel.findOne({ name: model.name, brandId: model.brandId, segment: model.segment });
            if (existingModel) {
                console.log(`Model with name ${model.name} and brand ID ${model.brandId} already exists. Skipping creation.`);
                continue;
            }

            const modelDetails: any = {
                name: model.name,
                slug: model.slug,
                brandId: model.brandId,
                segment: model.segment
            };

            await VehicleModel.create(modelDetails);
            console.log(`Model with name ${model.name} and brand ID ${model.brandId} created successfully.`);
        }
    } catch (error) {
        console.error('Error creating models:', error);
    } finally {
        disconnectDB();
    }
};
