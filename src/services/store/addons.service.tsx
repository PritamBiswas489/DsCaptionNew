import api from "@src/config/authApi.config.store";
interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}


export const getVendorAddons = async(): Promise<Response> => {
	try {
		const response = await api.get('/vendor/addon');
		return response;
	} catch (error:any) {
		return error.response;
	}
}