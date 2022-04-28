import React from 'react';
import {Box} from "@mui/material"
import {Routes, Route} from "react-router-dom"
import AuthPage from "./pages/AuthPage";
import LoginDirector from "./route-controllers/LoginDirector";
import Dashboard from "./route-controllers/Dashboard";


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
