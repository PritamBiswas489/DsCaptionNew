import api from "@src/config/authApi.config.store";

interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}

export const updateProfileData = async (data:FormData): Promise<Response> => {
    try {
		const response = await api.post('/vendor/update-profile',data);
		return response;
	} catch (error:any) {
		return error.response;
	}
}
 

//save fcm token process
// export const saveFcmTokenProcess = async (formData:FormData):Promise<Response> => { 
// 	formData.append('_method','PUT')
// 	try {
// 		const response = await api.post(`/provider/update/fcm-token`,formData);
// 		console.log(response?.data)
// 		return response;
// 	} catch (error:any) {
// 		return error.response;
// 	}
// }