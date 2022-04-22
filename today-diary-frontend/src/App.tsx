import React from 'react';
import {Box} from "@mui/material"
import {Routes, Route} from "react-router-dom"
import AuthPage from "./components/AuthPage";
import LoginDirector from "./components/LoginDirector";
import Dashboard from "./components/Dashboard";


const App = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Routes>
        <Route path='/login' element={<AuthPage />} />
        <Route path='/signup' element={<AuthPage />} />
        <Route path='/confirmation' element={<AuthPage />} />
        <Route path='/contact' element={<AuthPage />} />
        <Route path='*' element={<LoginDirector />}>
          <Route path='*' element={<Dashboard />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
