import api from "@src/config/authApi.config.store";
interface Response {
	data: any;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
}
//get All Orders
export const getCompleteOrders = async(limit:number,offset:number,status:string): Promise<Response> => { //all,refunded,delivered
	try {
		const response = await api.get(`/vendor/completed-orders?limit=${limit}&offset=${offset}&status=${status}`);
		return response;
	} catch (error:any) {
		return error.response;
	}
}
//get all orders
export const getAllOrders = async(): Promise<Response> =>{
    try {
		const response = await api.get(`/vendor/all-orders`);
		return response;
	} catch (error:any) {
		return error.response;
	}
}
//get current orders
export const getCurrentOrders = async(): Promise<Response> =>{
	try {
		const response = await api.get(`/vendor/current-orders`);
		return response;
	} catch (error:any) {
		return error.response;
	}
}

//get current order details
export const getCurrentOrderDetails = async(orderId:string | number): Promise<Response> =>{
	try {
		const response = await api.get(`/vendor/order?order_id=${orderId}`);
		return response;
	} catch (error:any) {
		return error.response;
	}

}
//get order details
export const getOrderProductList = async(orderId:string | number): Promise<Response> =>{
	try {
		const response = await api.get(`/vendor/order-details?order_id=${orderId}`);
		return response;
	} catch (error:any) {
		return error.response;
	}
}