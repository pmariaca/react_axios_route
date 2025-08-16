import axiosInstance from '../axiosInstance'

// Axios instances, created using axios.create(), inherently support 
// asynchronous operations, particularly when used with async/await syntax.
// https://axios-http.com/docs/interceptors

export async function userLoader() {
  const response = await axiosInstance.get(`user/user`);
  // const response = await axiosInstance.get(`user/${params.username}`);
  // console.log('  ----  response : ', response)
  return response.data;
}
export async function logoutLoader() {
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

export async function loginLoader(formData) {
  console.log('===== Login formData', formData);
  try {
    const response = await axiosInstance
      .post(`user/login/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        // console.log('===== Login -- res.data', res.data);
        // console.log('===== Login -- res.data.tokens', res.data.tokens);

        localStorage.setItem('username', res.data.username);
        localStorage.setItem('access_token', res.data.tokens.access);
        localStorage.setItem('refresh_token', res.data.tokens.refresh);
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');
        return response.data;
      })
  } catch (error) {
  }
}


// export async function myDataLoader({ params }) {
//   try {
//     // Example: Fetching a user by ID from route parameters
//     const response = await axios.get(`/api/users/${params.userId}`);
//     return json(response.data); // Return data wrapped in json helper for proper serialization
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Handle errors, e.g., return a specific error status or message
//     return json({ message: "Failed to load data" }, { status: 500 });
//   }
// }