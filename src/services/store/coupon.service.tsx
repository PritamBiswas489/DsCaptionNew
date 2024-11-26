import api from "@src/config/authApi.config.store";
interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}

export const createCoupon = async(formData:FormData): Promise<Response> => {
	try {
		const response = await api.post('/vendor/coupon/store',formData);
		return response;
	} catch (error:any) {
		return error.response;
	}
}