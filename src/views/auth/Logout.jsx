import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router';

function Logout() {
	const navegate = useNavigate()

		useEffect(() => {

			console.log(' ============= Logout  ============== ')


		const response = axiosInstance.post('user/logout/', {
			refresh_token: localStorage.getItem('refresh_token'),
		})
		.catch(err => {
        const response = err.response
        //console.log(response.data.message)
        if (response && response.status == 422) {
          // setErrors(response.data.errors)
        } else {
          // setErrors({
          //   email: [response.data.message]
          // })
        }
      })
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('username');
		axiosInstance.defaults.headers['Authorization'] = null;
		navegate("/"); 
	});

	return <div>Logout</div>;
}

export default Logout