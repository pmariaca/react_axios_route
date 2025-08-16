import { useLoaderData } from "react-router";
import { Typography } from "@mui/material";

const InfoUsr_3 = () => {

  // en router, se llama a axiosInstance
  let data = useLoaderData();
  const email = data.email
  const username = data.username
  // console.log('  ----  useLoaderData(): ', data)

  return (
    <div><br/>
      <Typography color="blue">InfoUsr_3 - con useLoaderData() se obtienen "username" e "email" 
        de router.jsx, donde se hace llamada a <b>axiosController</b></Typography>
      <div>
        <br />
        username: {username}
      </div>

      <div>
        email: {email}
      </div>
    </div>
  )
}

export default InfoUsr_3
