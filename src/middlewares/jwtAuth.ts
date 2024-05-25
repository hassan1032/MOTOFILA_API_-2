import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/jwt.auth';

interface TokenPayload {
   userId: string;
   role: string;
}

interface AuthenticatedRequest extends Request {
   userId?: string;
   role?: string;
}

function authenticateCustomer(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
   const authHeader = req.headers.authorization;
   if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
         const payload = verifyToken(token) as TokenPayload;
         if (payload.role !== 'customer') {
            res.status(403).json({
               message: 'Forbidden. Customer role required',
               status: 'error',
            });
         } else {
            req.userId = payload.userId;
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

function authenticateAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
   const authHeader = req.headers.authorization;
   if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
         const payload = verifyToken(token) as TokenPayload;
         if (payload.role !== 'admin') {
            res.status(403).json({
               message: 'Forbidden. Admin role required',
               status: 'error',
            });
         } else {
            req.userId = payload.userId;
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

export { authenticateCustomer, authenticateAdmin };
