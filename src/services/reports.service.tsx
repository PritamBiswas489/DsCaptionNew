import api from "../config/authApi.config";

interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}

export const getBookingReports = async(data:FormData): Promise<Response> => {
	try {
		const response = await api.post('/provider/report/booking',data);
		return response;
	} catch (error:any) {
		return error.response;
	}
}