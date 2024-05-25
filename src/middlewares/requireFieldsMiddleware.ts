import { Request, Response, NextFunction } from 'express';

function requireFieldsMiddleware(fields: string[]) {
   return function (req: Request, res: Response, next: NextFunction) {
      const missingFields: string[] = [];

      fields.forEach((field) => {
         if (!req.body[field]) {
            missingFields.push(field);
         }
      });

      if (missingFields.length > 0) {
         return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`,
         });
      }

      next();
   };
}

export default requireFieldsMiddleware;
