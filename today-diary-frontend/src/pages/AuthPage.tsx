import {Box, Typography, useTheme} from '@mui/material'
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import {useLocation, useNavigate} from 'react-router-dom'
import ConfirmationForm from "../components/ConfirmationForm";
import ReportIssueForm from "../components/ReportIssueForm";

const AuthPage = () => {

  const theme = useTheme()
  const {pathname} = useLocation()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: `linear-gradient(to right, ${theme.palette.primary.main}, #ffccd6)`,
        display: {
          xs: 'block',
          sm: 'block',
          md: 'flex'
        },
        pt: {
          xs: '30px',
          sm: '100px',
          md: '0'
        },
        boxSizing: 'border-box'
      }}
    >
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            background: 'linear-gradient(to right, #a2ffa1, #ebffa1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: {
              xs: '40px',
              sm: '70px'
            },
            fontStyle: 'italic',
            fontWeight: 'bold',
            mb: {
              xs: '20px',
              sm: '0'
            }
          }}
        >
          Today Diary
        </Typography>
      </Box>
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {
          pathname.includes('login') ?
            <LoginForm /> :
            pathname.includes('signup') ?
              <SignupForm /> :
              pathname.includes('confirmation') ?
                <ConfirmationForm /> : <ReportIssueForm />
        }
      </Box>
      <Box
        onClick={() => navigate('/contact')}
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          cursor: 'pointer',
          color: 'white',
          fontStyle: 'italic',
          textDecoration: 'underline'
        }}
      >
        Report issue
      </Box>
    </Box>
  )
}

export default AuthPage
