import api from "@src/config/authApi.config";

interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
// get catgories 
export const getCategories = async (queryParam: string): Promise<Response> => {
    try {
        const response = await api.get(`/provider/category${queryParam}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
}
//get sub categories 
export const getSubCategories = async (queryParam: string): Promise<Response> => {
    try {
        const response = await api.get(`/provider/category/childes${queryParam}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
}