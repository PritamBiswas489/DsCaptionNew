import api from "../config/authApi.config";

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
		const response = await api.post('/provider/update/profile',data);
		return response;
	} catch (error:any) {
		return error.response;
	}
}