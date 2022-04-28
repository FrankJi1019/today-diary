import {Box, TextField, Typography, IconButton} from '@mui/material'
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAuth} from "../providers/AuthProvider";
import {getHomePageUrl} from "../routes";
import {LoadingButton} from "@mui/lab";

const ConfirmationForm = () => {

  const {state} = useLocation()
  const navigate = useNavigate()
  const {confirmUser} = useAuth()

  const [code, setCode] = useState('')
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  let username, email
  try {
    username = (state as {username: string}).username
  } catch (e) {
    username = ''
  }
  try {
    email = (state as {email: string}).email
  } catch (e) {
    email = ''
  }

  const confirm = async () => {
    const result = await confirmUser((state as { username: string }).username, code)
    if (result) navigate(getHomePageUrl())
  }

  return (
    <Box sx={{position: 'relative'}}>
      <Box
        sx={{
          position: 'absolute',
          top: '-60px',
          left: '0px'
        }}
      >
        <IconButton onClick={() => navigate('/signup')}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{mb: '30px'}}>
        <Typography sx={{color: '#fdfbfe'}}>
          Hi {username}
        </Typography>
        <Typography sx={{color: '#fdfbfe'}}>
          Your verification code has been send to
          {email ? ':' : ' your email'}
        </Typography>
        <Typography sx={{color: '#fdfbfe'}}>
          {email}
        </Typography>
      </Box>
      <Box sx={{mb: '30px'}}>
        <TextField
          placeholder='Verification Code'
          value={code}
          onChange={e => setCode(e.target.value)}
          variant='standard'
          InputProps={{
            disableUnderline: true
          }}
          sx={{
            width: '350px',
            borderRadius: '6px',
            overflow: 'hidden',
            '& input': {
              padding: '16px 14px',
              backgroundColor: 'white',
              outline: 'none'
            }
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right'
        }}
      >
        <LoadingButton
          variant='contained'
          loading={buttonLoading}
          onClick={async () => {
            setButtonLoading(true)
            await confirm()
            setButtonLoading(false)
          }}
          disabled={code.trim() === ''}
        >
          Confirm
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default ConfirmationForm
