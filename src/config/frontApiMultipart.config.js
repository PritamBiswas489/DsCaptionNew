import axios from 'axios';
import { getAppUrl } from './utility';
const app_url =  getAppUrl();
 
const API_PROCESS = axios.create({
	baseURL: app_url + '/api/v1',
	timeout: 15000,
});

API_PROCESS.interceptors.request.use(async (config) => {
	config.headers = {
		'Content-Type': 'multipart/form-data',
	};

	return config;
});
 
export default API_PROCESS;
