import axios from 'axios'

export const IP = 'http://10.21.48.11:8080/anywork/';
export const myAxios = axios.create({
	baseURL: IP,
})
