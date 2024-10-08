import api from "../config/authApi.config";

interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}


export const createOrderRozarPayService = async(formData:FormData): Promise<Response> => {
	try {
		const response = await api.post(`/provider/rozar-pay-create-order`,formData);
		return response;
	} catch (error:any) {
		return error.response;
	}
}
export const paymentSuccessProcess = async(formData:FormData): Promise<Response> => {
	try {
		const response = await api.post(`/provider/rozar-pay-success-order`,formData);
		return response;
	} catch (error:any) {
		return error.response;
	}
}
