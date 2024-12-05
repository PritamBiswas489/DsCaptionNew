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
export const updateCoupon = async(formData:FormData): Promise<Response> => {
	try {
		const response = await api.post('/vendor/coupon/update',formData);
		return response;
	} catch (error:any) {
		return error.response;
	}
}
///vendor/coupon/update

export const getCouponDetails = async(coupon_id:string): Promise<Response> => {
	try {
		const response = await api.get(`/vendor/coupon/view-without-translate?coupon_id=${coupon_id}`);
		return response;
	} catch (error:any) {
		return error.response;
	}
}