import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import UploadService from '../services/upload.services';
import httpStatusCodes from '../statusCodes';
import statusTypes from '../statusTypes';
import { authValues } from '../auth/jwt.auth';

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const file = req.file as unknown as UploadedFile & { buffer: Buffer };
      if (!file) {
         return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
            data: null,
            statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
            type: statusTypes.FAILURE,
            msg: 'No file uploaded',
         });
      }

      const { buffer, mimetype } = file;
      const isImage = mimetype.startsWith('image/');
      const isGif = mimetype === 'image/gif';

      if (!isImage && !isGif) {
         return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
            data: null,
            statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
            type: statusTypes.FAILURE,
            msg: 'Invalid file type. Only image files are allowed.',
         });
      }

      const imgType = req.query.imgType as string;
      const authHeader = req.headers['authorization'];
      if (!authHeader || typeof authHeader !== 'string') {
         return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
            data: null,
            statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
            type: statusTypes.FAILURE,
            msg: 'Authorization header is missing or invalid',
         });
      }

      const userDetails: any = await authValues(authHeader);
      const uploadedBy = userDetails._id;
      let directoryPath = isGif ? path.join(__dirname, '..', '../public/gifs') : '';

      switch (imgType) {
         case 'users':
            directoryPath = path.join(__dirname, '..', '../public/users');
            break;
         case 'vendor':
            directoryPath = path.join(__dirname, '..', '../public/vendor');
            break;
         case 'gallery':
            directoryPath = path.join(__dirname, '..', '../public/gallery');
            break;
         case 'admin':
            directoryPath = path.join(__dirname, '..', '../public/admin');
            break;
         default:
            directoryPath = path.join(__dirname, '..', '../public/img');
      }

      const extension = isGif ? '.gif' : `.${mimetype.split('/')[1]}`;
      const filename = `${Date.now()}${extension}`;
      const filepath = path.join(directoryPath, filename);

      if (!fs.existsSync(directoryPath)) {
         fs.mkdirSync(directoryPath, { recursive: true });
      }

      fs.writeFileSync(filepath, buffer);
      const uploadedId = await UploadService.createUpload({
         fileName: filename,
         filePath: filepath,
         uploadedBy,
      });

      res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({
         data: uploadedId,
         statusCode: httpStatusCodes.HTTP_STATUS_CREATED,
         type: statusTypes.SUCCESS,
         msg: 'Image uploaded successfully',
      });
   } catch (err) {
      next(err);
   }
};

export const uploadPdf = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const file = req.file as unknown as UploadedFile & { buffer: Buffer };
      if (!file) {
         return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
            data: null,
            statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
            type: statusTypes.FAILURE,
            msg: 'No file uploaded',
         });
      }

      const { buffer, mimetype } = file;
      if (mimetype !== 'application/pdf') {
         return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
            data: null,
            statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
            type: statusTypes.FAILURE,
            msg: 'Invalid file type. Only PDF files are allowed.',
         });
      }

      const authHeader = req.headers['authorization'];
      if (!authHeader || typeof authHeader !== 'string') {
         return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({
            data: null,
            statusCode: httpStatusCodes.HTTP_STATUS_BAD_REQUEST,
            type: statusTypes.FAILURE,
            msg: 'Authorization header is missing or invalid',
         });
      }

      const userDetails: any = await authValues(authHeader);
      const uploadedBy = userDetails._id;

      const directoryPath = path.join(__dirname, '..', '../public/pdfs');
      if (!fs.existsSync(directoryPath)) {
         fs.mkdirSync(directoryPath, { recursive: true });
      }

      const filename = `${Date.now()}.pdf`;
      const filepath = path.join(directoryPath, filename);

      fs.writeFileSync(filepath, buffer);

      const uploadedId = await UploadService.createUpload({
         fileName: filename,
         filePath: filepath,
         uploadedBy,
      });

      res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({
         data: uploadedId,
         statusCode: httpStatusCodes.HTTP_STATUS_CREATED,
         type: statusTypes.SUCCESS,
         msg: 'PDF uploaded successfully',
      });
   } catch (err) {
      next(err);
   }
};
