import React, { useState } from 'react'
import { RouterProvider } from 'react-router'
import router from './router';

function App() {

  return (
    <>
      <React.Fragment>
        <RouterProvider router={router} />
      </React.Fragment>
    </>
  )
}

export default App
