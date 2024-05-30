import fs from 'fs';
import { connectDB, disconnectDB } from '../config/db';
import BrandModel, { Brand } from '../models/brand.model';

export const addBrands = async (): Promise<void> => {
    await connectDB();
    try {
        const brandData = JSON.parse(fs.readFileSync('src/seeder/data/brands.json', 'utf-8'));

        for (const brand of brandData) {
            const existingBrand: Brand | null = await BrandModel.findOne({ brandId: brand.brandId });
            if (existingBrand) {
                console.log(`Brand with ID ${brand.brandId} already exists. Skipping creation.`);
                continue;
            }

            const brandDetails: any = {
                brandId: brand.brandId,
                name: brand.name,
                slug: brand.slug
            };

            await BrandModel.create(brandDetails);
            console.log(`Brand with ID ${brand.brandId} created successfully.`);
        }
    } catch (error) {
        console.error('Error creating brands:', error);
    } finally {
        disconnectDB();
    }
};


