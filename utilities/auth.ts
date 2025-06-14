import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, JwtPayload, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ApiResponse } from '../interfaces/aResponse';
import { ResponseMessages } from '../interfaces/responses';
dotenv.config();

export interface CustomRequest extends Request {
    user?: { email: string };
}

const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {

    const responseData: ApiResponse<null> = {
        data: null,
        message: '',
        successful: false
    }
    try {
        const jtoken = req.headers['authorization']?.split(' ')[1];

        if (!jtoken) {
            responseData.data = null;
            responseData.message = "Authorization token missing";
            responseData.successful = false;
            res.status(401).send(responseData);
            return;
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw ('Missing JWT key')
        }

        const decoded = jwt.verify(jtoken, secretKey) as JwtPayload;

        req.user = { email: decoded.email };


        next();

    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            responseData.data = null;
            responseData.message = "Session expired. Please sign in again.";
            responseData.successful = false;
            res.status(401).send(responseData);
            return;
        }
        if (error instanceof JsonWebTokenError) {
            responseData.data = null;
            responseData.message = "Invalid token. Please sign in again.";
            responseData.successful = false;
            res.status(403).send(responseData);
            return;
        }
        console.error(error);
        responseData.data = null;
        responseData.message = ResponseMessages.SERVER_ERROR;
        responseData.successful = false;
        res.status(500).json(responseData);
        return;
    }
};
export default authenticateToken;