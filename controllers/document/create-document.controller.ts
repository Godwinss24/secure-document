import { ApiResponse } from "../../interfaces/aResponse";
import { Response } from 'express';
import { ResponseMessages } from "../../interfaces/responses";
import { findOneUser } from "../../services/user/user.service";
import { CreateDocumentRequest } from "../../interfaces/createDocument";
import { encryptBuffer } from "../../utilities/encrypt";
import uploadImageToCloudinary from "../../services/uploadImage";
import { createDocument } from "../../services/document/document.service";

export const createDocumentControl = async (req: CreateDocumentRequest, res: Response) => {

    const { title, description } = req.body;

    const responseData: ApiResponse<null> = {
        data: null,
        message: '',
        successful: false
    }

    if (!title || !description || !req.file) {
        responseData.data = null;
        responseData.message = ResponseMessages.MISSING_FIELDS;
        responseData.successful = false;
        res.status(400).json(responseData);
        return;
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

        const imageURL = await uploadImageToCloudinary(req.file.buffer);

        await createDocument(user.id, title, description, imageURL);


        responseData.data = null;
        responseData.message = 'Document created successfully.';
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