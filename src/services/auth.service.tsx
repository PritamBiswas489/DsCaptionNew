import api from "../config/authApi.config";

interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
  }
export const getAuthUserService =  async (): Promise<Response> => {
	try {
		const response = await api.get('/provider');
		return response;
	} catch (error:any) {
		return error.response;
	}
};
 
