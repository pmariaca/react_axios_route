import { useState } from 'react'
import { createBrowserRouter, useNavigate } from "react-router";
import axiosInstance from './axiosInstance';
import { userLoader, loginLoader, logoutLoader } from './utils/axiosController';
// =============== ADMIN ===================
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './views/Dashboard';
import Logout from './views/auth/Logout';
import InfoUsr_1 from './views/admin/InfoUsr_1'
import InfoUsr_2 from './views/admin/InfoUsr_2';
import InfoUsr_3 from './views/admin/InfoUsr_3';
// ==================================
import GuesstLayout from './layouts/GuesstLayout';
import Home from './views/Home'
import About from './views/About'
import Login from './views/auth/Login'
import Signup from './views/auth/Signup';
import NotFound from './views/NotFound';


// https://reactrouter.com/how-to/client-data

const router = createBrowserRouter([
  {
    path: "/",
    // Component: GuesstLayout, // oks
    element: <GuesstLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "logout",
        loader: logoutLoader,
        element: <Logout />,
      },
      {
        path: "a/:username",
        element: <InfoUsr_1 />,
      },
      {
        path: "b/",
        loader: async () => {
          const response = await axiosInstance.get(`user/user/`);
          // console.log('  ----  response : ', response)
          // y en InfoUsr_2 se recuperan los datos useLoaderData()
          return response.data;
        },
        element: <InfoUsr_2 />,
      },
      {
        path: "c/",
        loader: userLoader,
        element: <InfoUsr_3 />,
      },
    ],
  },
]);

// ===============================================
const router_ccc = createBrowserRouter([
  {
    path: "/",
    Component: GuesstLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Dashboard },
      { path: "logout", Component: Logout },
      { path: "infousr_1", Component: InfoUsr_1 },
    ],
  },
  {
    path: "/",
    element: <NotFound />,
  },
]);

export default router
