import readline from 'readline'
import { seedAdmin } from './admin';
import { addBrands } from './brands';
import { addModels } from './models';

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

const SEEDER_PASSWORD = process.env.SEEDER_PASSWORD || '8888';

rl.question('Enter the seeding key: ', async (key: string) => {
   rl.close();
   if (key === SEEDER_PASSWORD) {
      await seedAdmin()
      await addBrands();
      await addModels();
   } else {
      console.error('Invalid key. Seeding aborted.');
      process.exit(1);
   }
});
