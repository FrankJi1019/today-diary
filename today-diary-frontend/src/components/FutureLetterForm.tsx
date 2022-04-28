import {Box, Button, TextField, useTheme} from '@mui/material'
import moment from "moment";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import {useState} from "react";
import {useAuth} from "../providers/AuthProvider";
import axios from "axios";
import {constants} from "../constants";
import {FC} from 'react'
import {ModalContent} from "./MyModal";

const FutureLetterForm: FC<{setModal: (content: ModalContent) => void}> = ({setModal}) => {

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
      setModal({
        content: `You will receive this letter on the ${moment(targetDate).format('Do of MMMM, YYYY')}`,
        title: 'Letter has been sent',
        icon: 'success'
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box>
      <Box
        sx={{
          mb: '10px',
        }}
      >
        <TextField
          placeholder='Subject'
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
          position: 'relative',
          display: 'flex',
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
              ml: '30px',
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
      <Box>
        <TextField
          variant='filled'
          multiline
          rows={12}
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
          mt: '30px',
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
