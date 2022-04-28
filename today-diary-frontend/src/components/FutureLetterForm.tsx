import {Box, Button, TextField, useTheme} from '@mui/material'
import moment from "moment";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import {useState} from "react";
import {useAuth} from "../Providers/AuthProvider";
import axios from "axios";
import {constants} from "../constants";

const FutureLetterForm = () => {

  const theme = useTheme()
  const {getCurrentUser} = useAuth()

  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [targetDate, setTargetDate] = useState<Date | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submit = async () => {
    const author = getCurrentUser()?.getUsername()
    const fromDate = moment(new Date()).format('YYYY-MM-DD')
    const toDate = moment(targetDate).format('YYYY-MM-DD')
    try {
      await axios.post(
        `${constants.backend}/users/${author}/future-letters`,
        {
          author, fromDate, toDate, title, content
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Box
        sx={{
          padding: {
            xs: '0 20px',
            sm: '0 50px',
            md: '0 200px'
          },
          mb: '10px',
        }}
      >
        <TextField
          label='Subject'
          variant='standard'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          sx={{
            width: '100%'
          }}
        />
      </Box>
      <Box
        sx={{
          padding: {
            xs: '0',
            sm: '0 20px',
            md: '0 200px'
          },
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Box
          onMouseEnter={() => setOpenDatePicker(true)}
          onMouseLeave={() => setOpenDatePicker(false)}
        >
          <Box
            sx={{
              cursor: 'pointer',
              fontSize: '18px',
              color: theme.palette.secondary.main,
              mb: '30px',
              mr: '30px',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            {
              targetDate ?
                moment(targetDate).format('DD / MM / YYYY') :
                'Pick a date'
            }
          </Box>
          <Box
            sx={{
              position: 'absolute',
              display: openDatePicker ? 'block' : 'none',
              boxShadow: '0px 0px 4px 1px rgba(0, 0, 0, .5)',
              borderRadius: '5px',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={targetDate}
              onYearChange={() => {}}
              minDate={new Date(new Date().setDate(new Date().getDate()+1))}
              onChange={(newValue) => {
                if (newValue) setTargetDate(newValue)
                setOpenDatePicker(false)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          margin: {
            xs: '0 20px 10px',
            sm: '0 50px 10px'
          }
        }}
      >
        <TextField
          variant='filled'
          multiline
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          sx={{
            width: '100%',
            '& .MuiFilledInput-root': {
              backgroundColor: theme.palette.secondary.light,
            }
          }}
        />
      </Box>
      <Box
        sx={{
          margin: {
            xs: '0 20px 10px',
            sm: '0 50px 10px'
          },
          display: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Button
          variant='contained'
          color='secondary'
          sx={{
            width: {
              xs: '100%',
              sm: 'auto'
            }
          }}
          onClick={submit}
          disabled={title.trim() === '' || content === '' || targetDate === null}
        >
          send
        </Button>
      </Box>
    </Box>
  )
}

export default FutureLetterForm
