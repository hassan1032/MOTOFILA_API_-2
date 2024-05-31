import bcrypt from 'bcrypt';
import { connectDB, disconnectDB } from '../config/db';
import UserModel, { User } from '../models/UserModel';

 export const seedAdmin = async (): Promise<void> => {
    await connectDB();
    try {
        const adminDetails = {
            name: 'MOTOFILA ADMIN',
            mobile: '9999999999',
            email: 'admin@motofila.com',
            password: '1234',
            isApproved: true,
            userType: 'admin'
        };

        // Check if the admin already exists
        const existingAdmin: User | null = await UserModel.findOne({ mobile: adminDetails.mobile });
        if (existingAdmin) {
            console.log('Admin already exists. Skipping creation.');
            return;
        }

        // Hash the password
        const hashedPassword: string = await bcrypt.hash(adminDetails.password, 10);

        // Create the admin user
        await UserModel.create({
            ...adminDetails,
            password: hashedPassword
        });

        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        disconnectDB();
    }
};