export interface ApiResponse<T> {
    successful: boolean;
    data: T |null;
    message: string | null
}
export const createResponse = <T>(data: T, successful: boolean, message: string): ApiResponse<T> => {
    return { data, successful, message };
}