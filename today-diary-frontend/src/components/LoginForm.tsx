import {Box, TextField} from '@mui/material'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Providers/AuthProvider";
import {getHomePageUrl} from "../routes";
import {LoadingButton} from "@mui/lab";

const LoginForm = () => {

  const navigate = useNavigate()
  const {login, resendCode} = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const confirm = async () => {
    const result = await login(username, password)
    if (result === true) navigate(getHomePageUrl())
    else setErrorMessage(result.toString())
    setButtonLoading(false)
  }

  return (
    <Box>
      <Box sx={{mb: '30px'}}>
        <TextField
          variant='standard'
          value={username}
          onChange={e => {
            setUsername(e.target.value)
            setErrorMessage(null)
          }}
          InputProps={{
            disableUnderline: true
          }}
          placeholder='Username'
          sx={{
            width: {
              xs: '200px',
              sm: '350px'
            },
            borderRadius: '6px',
            overflow: 'hidden',
            '& input': {
              padding: {
                xs: '8px 7px',
                sm: '16px 14px'
              },
              backgroundColor: 'white',
              outline: 'none'
            }
          }}
        />
      </Box>
      <Box sx={{mb: '10px'}}>
        <TextField
          variant='standard'
          type='Password'
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setErrorMessage(null)
          }}
          InputProps={{
            disableUnderline: true
          }}
          placeholder='Password'
          sx={{
            width: {
              xs: '200px',
              sm: '350px'
            },
            borderRadius: '6px',
            overflow: 'hidden',
            '& input': {
              padding: {
                xs: '8px 7px',
                sm: '16px 14px'
              },
              backgroundColor: 'white',
              outline: 'none'
            }
          }}
        />
      </Box>
      <Box
        sx={{
          color: 'red',
          fontSize: '13px',
          mb: '15px',
          display: 'flex',
          flexDirection: 'row-reverse',
          minHeight: '20px',
        }}
      >
        <Box
          sx={{
            maxWidth: {
              xs: '200px',
              sm: '350px'
            },
          }}
        >
          {errorMessage || ' '}
          {
            errorMessage === 'User is not confirmed.' &&
              <Box
                sx={{
                  cursor: 'pointer',
                  fontStyle: 'italic',
                  textDecoration: 'underline'
                }}
                onClick={async () => {
                  await resendCode(username)
                  navigate('/confirmation', {
                    state: {
                      username
                    }
                  })
                }}
              >
                Confirm email now
              </Box>
          }
        </Box>
      </Box>
      <Box
        onClick={() => navigate('/signup')}
        sx={{
          fontSize: '13px',
          mb: '30px',
          cursor: 'pointer',
          color: '#fdfbfe'
        }}
      >
        Create new account
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right'
        }}
      >
          <LoadingButton
            loading={buttonLoading}
            variant='contained'
            onClick={async () => {
              setButtonLoading(true)
              await confirm()
            }}
            disabled={username.trim() === '' || password.trim() === ''}
          >
            Login
          </LoadingButton>
      </Box>
    </Box>
  )
}

export default LoginForm
