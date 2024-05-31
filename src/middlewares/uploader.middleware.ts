import { Request } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
   storage,
   limits: {
      fileSize: 25 * 1024 * 1024, // 25 MB limit
   },
   fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
      if (file.mimetype.startsWith('image/')) {
         cb(null, true);
      } else if (file.mimetype === 'application/pdf') {
         cb(null, true); 
      } else {
         const error = new Error('Invalid file type');
         error.name = 'MulterError';
         cb(error, false);
      }
   },
});

export const uploadImageMiddleware = upload.single('image'); 
export const uploadMultipleImagesMiddleware = upload.array('images', 10); 
export const uploadPdfMiddleware = upload.single('pdf'); 
