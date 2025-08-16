import { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { useParams } from "react-router";
import { Typography } from '@mui/material';

const InfoUsr_1 = () => {
  const { username } = useParams()
  const [email, setEmail] = useState()

  // console.log('  ----  useParams() : ', useParams())
  useEffect(() => {
    axiosInstance
      .get(`user/user/`)
      .then((res) => {
        console.log('===== axiosInstance res.data ', res.data);
        setEmail(res.data.email)
      })
      .catch(err => {
        const response = err.response
        console.log('InfoUsr_1  axiosInstance response ', response)
      })
  }, [username]);

  return (
    <div><br/>
      <Typography color="blue">InfoUsr_1 - aqui se obtiene "username" de useParams() y  se hace llamada a axiosInstance</Typography>
      <div><br/>
        username: {username}
      </div>
      <div>
        email: {email}
      </div>
    </div>
  )
}

export default InfoUsr_1
