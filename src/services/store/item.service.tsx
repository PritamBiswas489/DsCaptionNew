import api from "@src/config/authApi.config.store";
interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}

 
export const createVendorItems = async(formData:FormData): Promise<Response> => {
	try {
		const response = await api.post('/vendor/item/store',formData);
		return response;
	} catch (error:any) {
		return error.response;
	}
}

///vendor/item/details
export const retrieveItemDetails  = async (itemid:string) : Promise<Response> => {
	try {
		const response = await api.get(`/vendor/item/details/${itemid}`);
		return response;
	} catch (error:any) {
		return error.response;
	}

}