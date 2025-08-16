import React from 'react'
import AppHeader from '../comonents/AppHeader';
import { Navigate, Outlet } from "react-router";

const DashboardLayout = () => {
  // const navigation = useNavigation();
  const access_token = localStorage.getItem('access_token');
  // console.log(' -- DefaultLayout  DefaultLayout  DefaultLayout  DefaultLayout  ---')
  if (!access_token) {
    return <Navigate to="/" />
  }

  return (
    <>
      <AppHeader /> <hr /><hr /><hr /><hr /><hr /><hr /> DashboardLayout
      <div id="detail" >
        <Outlet
        // className={
        //   navigation.state === "loading" ? "loading" : ""
        // }
        />
      </div>
    </>
  )
}

export default DashboardLayout
