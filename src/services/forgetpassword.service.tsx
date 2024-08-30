import api from "@src/config/frontApi.config";

interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}

export const getForgetpasswordOtp = async (formData: {identity:string,identity_type:string}): Promise<Response> => {
    try {
        const response = await api.post(`/user/forget-password/send-otp`,formData);
        return response;
    } catch (error: any) {
        return error.response;
    }
}