import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';
import { API_SECRET } from "../config/jwt";
import { authValues } from "./jwt.auth";

export const vendorAuthentication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string | undefined = req.headers['authorization'];
        if (!token) {
            res.status(404).json({ status: false, msg: "Token Not Found" });
            return;
        }
        jwt.verify(token, API_SECRET, async function (err, decodedToken) {
            if (err) {
                res.status(401).json({ status: false, msg: "Token Expired" });
                return;
            } else {
                const decoded = await authValues(token);
                if (decoded && decoded.userType === "vendor" && decoded.isApproved) {
                    next();
                } else {
                    res.status(401).json({ status: false, msg: "Invalid Token or Not Approved" });
                    return;
                }
            }
        });
    } catch (err) {
        next(err);
    }
}