import api from "../config/authApi.config";

interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}


export const getBusinessSettingsAvailabletimeSchedule = async(): Promise<Response> => {
    try {
		const response = await api.get('/provider/available-time-schedule');
		return response;
	} catch (error:any) {
		return error.response;
	}

}


export const getBusinessSettings   = async(): Promise<Response> => {
    try {
		const response = await api.get('/provider/business-settings/get-business-settings');
		return response;
	} catch (error:any) {
		return error.response;
	}
}