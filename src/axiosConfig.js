import axios from 'axios';

const axiosBase = axios.create({
	// baseURL: 'http://localhost:3000/api',
	baseURL: 'https://evangadi-forum-backend-ncoh.onrender.com/api',
});

export default axiosBase;
