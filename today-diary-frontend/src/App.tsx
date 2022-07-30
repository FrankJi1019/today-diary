import React from 'react';
import {Box} from "@mui/material"
import LoginDirector from "./route-controllers/LoginDirector";
import Dashboard from "./route-controllers/Dashboard";
import {useAuth} from "./providers/AuthProvider";

const App = () => {

  const {getCurrentUser} = useAuth()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {getCurrentUser() ? <Dashboard /> : <LoginDirector />}
    </Box>
  );
}

export default App;
