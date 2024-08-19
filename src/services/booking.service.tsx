import api from "@src/config/authApi.config";

interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}

export const getBookings = async (formData: FormData): Promise<Response> => {
    try {
        const response = await api.post(`/provider/booking`,formData);
        return response;
    } catch (error: any) {
        return error.response;
    }
}