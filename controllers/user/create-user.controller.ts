import { ApiResponse } from "../../interfaces/aResponse";
import { CreateUserRequest } from "../../interfaces/createUserRequest";
import { Response } from 'express';
import { ResponseMessages } from "../../interfaces/responses";
import { createUser, findOneUser } from "../../services/user/user.service";
import bcrypt from 'bcrypt';

export const createUserControl = async (req: CreateUserRequest, res: Response) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { email, password } = req.body;

    const responseData: ApiResponse<null> = {
        data: null,
        message: '',
        successful: false
    }

    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        responseData.data = null;
        responseData.message = 'Enter a valid email';
        responseData.successful = false;
        res.status(400).json(responseData);
        return;
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        responseData.data = null;
        responseData.message = 'Password must be at least 6 characters long.';
        responseData.successful = false;
        res.status(400).json(responseData);
        return;
    }
    try {

        const user = await findOneUser(email);

        if (user !== null) {
            responseData.data = null;
            responseData.message = ResponseMessages.USER_FOUND;
            responseData.successful = false;
            res.status(400).json(responseData);
            return;
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await createUser(email, hashedPassword);

        responseData.data = null;
        responseData.message = 'User created successfully.';
        responseData.successful = true;
        res.status(200).json(responseData);
        return;

    } catch (error) {
        console.error(error);
        responseData.data = null;
        responseData.message = ResponseMessages.SERVER_ERROR;
        responseData.successful = false;
        res.status(500).json(responseData);
        return;
    }
}