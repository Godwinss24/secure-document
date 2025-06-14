import { ApiResponse } from "../../interfaces/aResponse";
import { CreateUserRequest } from "../../interfaces/createUserRequest";
import { Response } from 'express';
import { ResponseMessages } from "../../interfaces/responses";
import {  findOneUser, generateJWt } from "../../services/user/user.service";
import bcrypt from 'bcrypt';

export const loginUserControl = async (req: CreateUserRequest, res: Response) => {

    const { email, password } = req.body;

    const responseData: ApiResponse<null | string> = {
        data: null,
        message: '',
        successful: false
    }
    
    if (!email || !password) {
        responseData.data = null;
        responseData.message = ResponseMessages.MISSING_FIELDS;
        responseData.successful = false;
        res.status(400).json(responseData);
        return;
    }

    try {

        const user = await findOneUser(email);

        if (user === null) {
            responseData.data = null;
            responseData.message = ResponseMessages.USER_NOT_FOUND;
            responseData.successful = false;
            res.status(404).json(responseData);
            return;
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            responseData.data = null;
            responseData.message = ResponseMessages.INVALID_CREDENTIALS;
            responseData.successful = false;
            res.status(400).json(responseData);
            return;
        }

        const accessToken = await generateJWt(email);

        responseData.data = accessToken;
        responseData.message = 'Login Successful';
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