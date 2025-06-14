import { Request } from "express";
export interface CreateUserRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}