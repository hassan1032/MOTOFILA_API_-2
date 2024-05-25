import jwt from 'jsonwebtoken';
import { API_SECRET } from '../config/jwt';

interface TokenPayload {
   userId: string;
   role: string;
}

export function generateToken(payload: TokenPayload): string {
   const timeToExpire = 3;
   const sec = timeToExpire * 3600;
   const threeHoursLater: any = Date.now() / 1000 + sec;
   return jwt.sign({ ...payload, exp: threeHoursLater }, API_SECRET);
}

export function verifyToken(token: string) {
   try {
      return jwt.verify(token, API_SECRET) as TokenPayload;
   } catch (error) {
      console.error('Error verifying tokenssssssssssssssssss:', error);
      return null;
   }
}
