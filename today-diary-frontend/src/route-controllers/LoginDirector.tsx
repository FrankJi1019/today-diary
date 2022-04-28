import {Box} from "@mui/material";
import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from "../providers/AuthProvider";

const LoginDirector = () => {

  const {getCurrentUser} = useAuth()

  return (
    <Box>
      {getCurrentUser() ? <Outlet /> : <Navigate to='/login' />}
    </Box>
  )
}

export default LoginDirector
