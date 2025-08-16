import axios from "axios";

// prueba con: console.log(' import.meta.env.VITE_SOME_KEY :   ',import.meta.env.VITE_SOME_KEY)
// VITE_API_BASE_URL='http://localhost:8000/' en dir raiz de la app: .env.local
const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
	timeout: 5000,
	// // por ahora lo dejo aqui
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});


// axiosInstance.interceptors.request.use((config) => {
// 	//const token = '3fac9ec0fa1cc7154278f875aafa4fe39158ea67'
// 	const token = localStorage.getItem('access_token')
// 	console.log('interceptors.request --- access_token ++---->> ' + token)
// 	// console.log('interceptors.request --- refresh_token ++---->> ' + localStorage.getItem('refresh_token'))

// 	// config.headers.Authorization = `Bearer ${token}`
// 	config.headers.Authorization = localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null
// 	if (config.data instanceof FormData) {
// 		config.headers['Content-Type'] = 'multipart/form-data';
// 		//config.headers['Content-Type'] = 'application/json';
// 		config.headers['Accept'] = 'application/json';
// 	} else {
// 		config.headers['Content-Type'] = 'multipart/form-data';
// 		//config.headers['Content-Type'] = 'application/json';
// 		config.headers['Accept'] = 'application/json';
// 	}
// 	// console.log('axios-client config.data: ++---->> config.data ',config.data)
// 	return config;
// }, function (error) {
// console.log(' -- ERROR -- interceptors.request error ',error)

// });

// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     const { response } = error;
//     if (response.status == 401) {
//       localStorage.removeItem('access_token')
//     }
//     if (response.status == 404) {
//       console.log('error ++---->> ')
//     }
//     console.log('error-->> ', error)
//     throw error;
//   });

axiosInstance.interceptors.response.use(
	(response) => {
		// console.log(' ------ response  ',response)
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log(' ------ AXIOS -- axiosInstance.interceptors.response  error.config:  ', error.config)
		if (typeof error.response === 'undefined') {
			console.log(' ------ undefined -- undefined  error:  ', error)
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			// throw error;
			return Promise.reject(error);
		}
		console.log(' ------ error.response:  ', error.response)
		console.log(' ------ error.response originalRequest.url', originalRequest.url)
		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			// throw error;
			return Promise.reject(error);
		}
		console.log(' ------ error.response.data.access  ', error.response.data.access)
		console.log(' ------ error.response.data.tokens  ', error.response.data.tokens)
		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log('  ---------    ', tokenParts.exp);
				console.log(' --------------- now', now, 'tokenParts.exp', tokenParts.exp)

				if (tokenParts.exp > now) {
					console.log('  ---------   aajjjjjjaaaaaaaaaaaaa now')
					return axiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							console.log(' ------ error.response.data', error.response.data)

							console.log(' 2222 ------ error.response.data.access  ', error.response.data.access)
							console.log(' 2222 ------ error.response.data.tokens  ', error.response.data.tokens)


							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('  ---------   Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('  ---------   Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		// throw error;
		return Promise.reject(error);
	}
);

export default axiosInstance