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

  const sendEmail = () => {
    emailjs.send(
      constants.emailJs.ServiceId,
      constants.emailJs.TemplateId,
      {subject, message, email},
      constants.emailJs.PublicKey
    ).then(() => {
      setResponse('Issue has been reported')
    }, () => {
      setResponse('An error has occurred')
    });
    setButtonLoading(false)
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
          color: response === 'Issue has been reported' ? 'green' : 'red',
          fontSize: '13px',
          mb: '25px',
          minHeight: '20px',
          maxWidth: {
            xs: '200px',
            sm: '350px'
          },
        }}
      >
        {response}
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
