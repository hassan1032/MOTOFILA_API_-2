import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/jwt.auth';

interface TokenPayload {
   vendorId: string | undefined;
   role: string;
}

interface AuthenticatedRequest extends Request {
   vendorId?: string;
   role?: string;
}

function authenticateVendor(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
   const authHeader = req.headers.authorization;
   if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
         const payload = verifyToken(token) as TokenPayload;
         if (payload.role !== 'vendor') {
            res.status(403).json({
               message: 'Forbidden. Vendor role required',
               status: 'error',
            });
         } else {
            req.vendorId = payload.vendorId;
            req.role = payload.role;
            next();
         }
      } catch (error) {
         res.status(401).json({
            message: 'Invalid or expired token',
            status: 'error',
         });
      }
   } else {
      res.status(401).json({
         message: 'Authentication required',
         status: 'error',
      });
   }
}

export { authenticateVendor };
