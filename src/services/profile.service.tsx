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
export const getUserBankDetails = async(): Promise<Response> => {
	try {
		const response = await api.get('/provider/get-bank-details');
		return response;
	} catch (error:any) {
		return error.response;
	}

}

export const saveBankDetails = async(data:FormData): Promise<Response> => {
	data.append('_method','PUT')
	try {
		
		const response = await api.post('/provider/update-bank-details',data);
		return response;
	} catch (error:any) {
		return error.response;
	}
}

export const getReviewList = async(queryParam:string): Promise<Response> => {
	try {
		const response = await api.get(`/provider/review${queryParam}`);
		return response;
	} catch (error:any) {
		return error.response;
	}

}