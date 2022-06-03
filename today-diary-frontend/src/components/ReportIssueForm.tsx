import {Box, IconButton, TextField} from '@mui/material'
import {LoadingButton} from "@mui/lab";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import emailjs from "@emailjs/browser"
import {useState} from "react";
import {constants} from "../constants";

const ReportIssueForm = () => {

  const navigate = useNavigate()

  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [showResult, setShowResult] = useState(false)

  const sendEmail = () => {
    emailjs.send(
      constants.emailJs.ServiceId,
      constants.emailJs.TemplateId,
      {subject, message, email},
      constants.emailJs.PublicKey
    ).then(() => {
      setResponse('Your issue has been reported')
      setButtonLoading(false)
      setSubject('')
      setEmail('')
      setMessage('')
      setShowResult(true)
    }, () => {
      setResponse('An error has occurred')
      setButtonLoading(false)
      setShowResult(true)
    });
  }

  if (showResult) {
    console.log(123)
    return (
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, .5)',
          padding: {
            xs: '20px 10px',
            sm: '20px 20px'
          },
          borderRadius: '10px',
          width: {
            xs: '250px',
            sm: '500px'
          }
        }}
      >
        <Box
          sx={{
            color: response === 'Your issue has been reported' ? 'green' : 'red',
            fontSize: {
              xs: '16px',
              sm: '20px'
            }
          }}
        >
          {response}
        </Box>
        <Box
          onClick={() => navigate('/login')}
          sx={{
            color: '#444',
            textDecoration: 'underline',
            mt: '10px',
            textAlign: 'right',
            cursor: 'pointer',
            fontSize: {
              xs: '14px',
              sm: '16px'
            }
          }}
        >
          Go back to login screen
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{position: 'relative'}}>
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: {
            xs: '-30px',
            sm: '-60px'
          },
          left: '0px',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          mb: '20px',
          mt: {
            xs: '10px',
            sm: '0px'
          }
        }}
      >
        <TextField
          value={subject}
          onChange={e => {
            setSubject(e.target.value)
            setResponse('')
          }}
          variant='standard'
          InputProps={{
            disableUnderline: true
          }}
          placeholder='Subject'
          sx={{
            width: {
              xs: '280px',
              sm: '500px'
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
      <Box sx={{mb: '20px'}}>
        <TextField
          value={email}
          onChange={e => {
            setEmail(e.target.value)
            setResponse('')
          }}
          variant='standard'
          InputProps={{
            disableUnderline: true
          }}
          placeholder='Your email'
          sx={{
            width: {
              xs: '280px',
              sm: '500px'
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
          value={message}
          onChange={e => {
            setMessage(e.target.value)
            setResponse('')
          }}
          multiline
          rows={7}
          variant='standard'
          InputProps={{
            disableUnderline: true
          }}
          placeholder='Message'
          sx={{
            width: {
              xs: '280px',
              sm: '500px'
            },
            overflow: 'hidden',
            '& textarea': {
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
          display: 'flex',
          justifyContent: 'right'
        }}
      >
        <LoadingButton
          variant='contained'
          onClick={() => {
            setButtonLoading(true)
            sendEmail()
          }}
          loading={buttonLoading}
          disabled={[subject, email, message].some(input => input.trim() === '')}
        >
          Report
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default ReportIssueForm
