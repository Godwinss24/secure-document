import { Response } from "express";
import { ApiResponse } from "../interfaces/aResponse";
import { ResponseMessages } from "../interfaces/responses";
import { findOneUser } from "../services/user/user.service";


export async function TestControl(res: Response) {
    const responseData: ApiResponse<null | string | {}> = {
        data: null,
        message: '',
        successful: false
    }
    try {

        // const test = await findOneUser('e')
        // console.log("test => ", test);        

        responseData.data = null;
        responseData.message = "OK";
        responseData.successful = true;
        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        responseData.data = null;
        responseData.message = ResponseMessages.SERVER_ERROR;
        responseData.successful = false;
        res.status(500).json(responseData);
        return;
    }
}