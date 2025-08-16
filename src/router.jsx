import React, { useState } from 'react'
import { createBrowserRouter, useNavigate, } from "react-router";
// =============== ADMIN ===================
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './views/Dashboard';
import Logout from './views/auth/Logout';
import Media from './views/admin/Media'
// ==================================
import GuesstLayout from './layouts/GuesstLayout';
import Home from './views/Home'
import About from './views/About'
import Login from './views/auth/Login'
import Signup from './views/auth/Signup';
import NotFound from './views/NotFound';



// https://reactrouter.com/6.30.1/start/tutorial
// https://reactrouter.com/tutorials/address-book
const router_x = createBrowserRouter([
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
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <NotFound />,
    children: [
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "media",
        element: <Media />,
      },
    ],
  },
]);

const router = createBrowserRouter([
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
      { path: "media", Component: Media },
    ],
  },
  {
    path: "/",
    element: <NotFound />,
  },
]);

const router_p = createBrowserRouter([
  {
    path: "/",
    Component: GuesstLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      // {
      //   path: "auth",
      //   Component: AuthLayout,
      //   children: [
      //     { path: "login", Component: Login },
      //     { path: "signup", Component: Signup },
      //   ],
      // },
      {
        path: "/dashboard",
        //Component: Dashboard,
        children: [
          { index: true, Component: Dashboard },
          { path: "logout", Component: Logout },
          { path: "media", Component: Media },
        ],
      },
      // {
      //   path: "concerts",
      //   children: [
      //     { index: true, Component: ConcertsHome },
      //     { path: ":city", Component: ConcertsCity },
      //     { path: "trending", Component: ConcertsTrending },
      //   ],
      // },
    ],

  },
]);

export default router
