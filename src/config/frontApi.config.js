import axios from 'axios';
import { getAppUrl } from './utility';
const app_url =  getAppUrl();
console.log(app_url);
const api = axios.create({
	baseURL: app_url + '/api/v1',
	timeout: 15000,
});
export default api;
