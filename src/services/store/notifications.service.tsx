import api from "@src/config/authApi.config.store";
interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}
//get notitfications list
export const getNotifications = async (queryParam:string): Promise<Response> => {
    try {
			const response = await api.get(`/vendor/notifications`);
			return response;
	} catch (error:any) {
			console.log(error)
			return error.response;
	}
}