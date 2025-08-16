import { Typography } from "@mui/material";
import { useLoaderData } from "react-router";

const InfoUsr_2 = () => {

  // en router, se llama a axiosInstance
  let data = useLoaderData();
  const email = data.email
  const username = data.username
  console.log('  ----  useLoaderData(): ', data)

  return (
    <div><br />
      <Typography color="blue">InfoUsr_2 - con useLoaderData() se obtienen "username" e "email" <b>de router.jsx</b> donde se hace llamada a <b>axiosInstance</b></Typography>
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

export default InfoUsr_2
