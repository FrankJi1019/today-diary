import {Navigate, Route, Routes} from 'react-router-dom'
import AuthPage from "../pages/AuthPage";
import React from "react";

const LoginDirector = () => {

  return (
      <Routes>
        <Route path='/login' element={<AuthPage />} />
        <Route path='/signup' element={<AuthPage />} />
        <Route path='/confirmation' element={<AuthPage />} />
        <Route path='/contact' element={<AuthPage />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
  )
}

export default LoginDirector
