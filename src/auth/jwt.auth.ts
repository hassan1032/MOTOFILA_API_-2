import jwt from 'jsonwebtoken';
import { API_SECRET } from '../config/jwt';
import UserModel from '../models/UserModel';

interface TokenPayload {
   userId: any
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





interface DecodedToken {
    userId: string;
}

export const authValues = async (authToken: string) => {
    try {
        const result = jwt.verify(authToken, API_SECRET) as DecodedToken;
        const user = await UserModel.findById(result.userId);
        return user;
    } catch (error) {
        // Handle JWT verification errors or database errors here
        return null;
    }
};
