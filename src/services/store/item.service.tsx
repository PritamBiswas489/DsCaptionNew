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
 
export const updateVendorItems = async(formData:FormData): Promise<Response> => {
	formData.append('_method','PUT')
	try {
		const response = await api.post('/vendor/item/update',formData);
		return response;
	} catch (error:any) {
		return error.response;
	}

}

 
export const retrieveItemDetails  = async (itemid:string) : Promise<Response> => {
	try {
		const response = await api.get(`/vendor/item/details/${itemid}`);
		return response;
	} catch (error:any) {
		return error.response;
	}

}
 
export const getItemList = async(limit:number,offset:number) : Promise<Response> => {
	try {
		const response = await api.get(`/vendor/get-items-list?limit=${limit}&offset=${offset}`);
		return response;
	} catch (error:any) {
		return error.response;
	}


}