import { CustomRequest } from "../utilities/auth";

export interface FindAllRequest extends CustomRequest {
    query: {
        page?: string, limit?: string, search?:string
    }
}