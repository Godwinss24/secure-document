import { CustomRequest } from "../utilities/auth";

export interface CreateDocumentRequest extends CustomRequest {
    body: {
        title?: string;
        description?: string;
    },
    file?: Express.Multer.File;
}