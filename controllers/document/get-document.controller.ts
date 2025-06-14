import { ApiResponse } from "../../interfaces/aResponse";
import { Response } from 'express';
import { ResponseMessages } from "../../interfaces/responses";
import { findOneUser } from "../../services/user/user.service";
import { findAllDocuments, findOneDocumentByID } from "../../services/document/document.service";
import { FindAllRequest, FindByIdRequest } from "../../interfaces/findAllDocumentRequest";

export const findAllDocumentsControl = async (req: FindAllRequest, res: Response) => {


    const responseData: ApiResponse<null | {}> = {
        data: null,
        message: '',
        successful: false
    }


    try {

        const user = await findOneUser(req.user?.email || '');

        if (user === null) {
            responseData.data = null;
            responseData.message = ResponseMessages.USER_NOT_FOUND;
            responseData.successful = false;
            res.status(400).json(responseData);
            return;
        }

        const page = parseInt(String(req.query.page || '1'), 10);
        const limit = parseInt(String(req.query.limit || '10'), 10);

        const documentsFetchResult = await findAllDocuments(user.id, page, limit, req.query.search || '');


        responseData.data = documentsFetchResult;
        responseData.message = 'Documents retrieved.';
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

export const findDocumentByIDControl = async (req: FindByIdRequest, res: Response) => {
    const responseData: ApiResponse<null | {}> = {
        data: null,
        message: '',
        successful: false
    }


    try {

        const user = await findOneUser(req.user?.email || '');

        if (user === null) {
            responseData.data = null;
            responseData.message = ResponseMessages.USER_NOT_FOUND;
            responseData.successful = false;
            res.status(400).json(responseData);
            return;
        }



        const document = await findOneDocumentByID(req.params.id, user.id);

        if (document === null) {
            responseData.data = document;
            responseData.message = 'Document not found';
            responseData.successful = true;
            res.status(200).json(responseData);
            return;

        }

        responseData.data = document;
        responseData.message = 'Documents retrieved.';
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