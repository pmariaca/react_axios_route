import axiosInstance from '../axiosInstance'
// basicamente loader es para get 
// y action para submit forma o POST/PUT/DELETE request

// Axios instances, created using axios.create(), inherently support 
// asynchronous operations, particularly when used with async/await syntax.
// https://axios-http.com/docs/interceptors

export async function userLoader() {
  const response = await axiosInstance.get(`user/user`);
  // const response = await axiosInstance.get(`user/${params.username}`);
  // console.log('  ----  response : ', response)
  return response.data;
}

// https://github.com/aaronksaunders/react-router-v7-auth-app-1/blob/main/app/routes/home.tsx
// si es post usar action
export async function logoutAction() {
  const response = await axiosInstance.post('user/logout/', {
    refresh_token: localStorage.getItem('refresh_token'),
  })
    .catch(err => {
      const response = err.response
      //console.log(response.data.message)
    })
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('username');
  axiosInstance.defaults.headers['Authorization'] = null;
  return response;
}

export async function loginAction({ request }) {
  const data = await request.formData()
  const submission = {
    email: data.get("email"),
    password: data.get("password"),
  }
  // console.log(' ----- data ---- ', data)
  const response = await axiosInstance.post(`user/login/`, submission)
    .then((res) => {
      // console.log('===== loginAction -- res.data', res.data);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('access_token', res.data.tokens.access);
      localStorage.setItem('refresh_token', res.data.tokens.refresh);
      axiosInstance.defaults.headers['Authorization'] =
        'JWT ' + localStorage.getItem('access_token');

        return res.data;
    })
    .catch(err => {
      return err
    })
  return response;
};
