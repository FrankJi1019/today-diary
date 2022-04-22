import {Box, TextField} from '@mui/material'
import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Providers/AuthProvider";
import {LoadingButton} from "@mui/lab";

const SignupForm = () => {

  const navigate = useNavigate()
  const {signup} = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const goToConfirmationForm = () => {
    navigate('/confirmation', {
      state: {
        email, username
      }
    })
  }

  const validate = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Two passwords do not match")
      setConfirmPassword('')
      return false
    }
    return true
  }

  const confirm = async () => {
    if (!validate()) {
      setButtonLoading(false)
      return
    }
    const result = await signup(username, email, password)
    console.log('signup', result)
    if (result === true) goToConfirmationForm()
    else setErrorMessage(result.toString())
    setButtonLoading(false)
  }

  return (
    <Box>
      <Box sx={{mb: '30px'}}>
        <TextField
          value={username}
          onChange={e => {
            setUsername(e.target.value)
            setErrorMessage(null)
          }}
          variant='standard'
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
      <Box sx={{mb: '30px'}}>
        <TextField
          value={email}
          onChange={e => {
            setErrorMessage(null)
            setEmail(e.target.value)
          }}
          variant='standard'
          InputProps={{
            disableUnderline: true
          }}
          placeholder='Email'
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
      <Box sx={{mb: '30px'}}>
        <TextField
          type='Password'
          value={password}
          onChange={e => {
            setErrorMessage(null)
            setPassword(e.target.value)
          }}
          variant='standard'
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
      <Box sx={{mb: '10px'}}>
        <TextField
          placeholder='Confirm password'
          type='Password'
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value)
            setErrorMessage(null)
          }}
          variant='standard'
          InputProps={{
            disableUnderline: true
          }}
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
        </Box>
      </Box>
      <Box
        onClick={() => navigate('/login')}
        sx={{
          fontSize: '13px',
          mb: '30px',
          cursor: 'pointer',
          color: '#fdfbfe'
        }}
      >
        Login with existing account
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
          disabled={
            [username, email, password, confirmPassword].some(input => input.trim() === '')
          }
        >
          Sign up
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default SignupForm
