import {Box, IconButton, useTheme} from '@mui/material'
import FutureLetterForm from "./FutureLetterForm";
import {FutureLetter} from "../types";
import {useEffect, useState} from "react";
import FutureLetterCard from "./FutureLetterCard";
import PageContainer from "./PageContainer";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useNavigate} from "react-router-dom";
import {getUnreadLetterPageUrl} from "../routes";
import axios from "axios";
import {constants} from "../constants";
import {useAuth} from "../Providers/AuthProvider";

const FutureDiaryPage = () => {

  const theme = useTheme()
  const navigate = useNavigate()
  const {getCurrentUser} = useAuth()

  const [futureLetters, setFutureLetters] = useState<Array<FutureLetter>>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    try {
      const useId = getCurrentUser()?.getUsername()
      axios.get(`${constants.backend}/users/${useId}/future-letters?filter=read`)
        .then(res => setFutureLetters(res.data))
    } catch (e) {
      console.log(e)
    }
  }, [getCurrentUser, setFutureLetters])

  useEffect(() => {
    try {
      const userId = getCurrentUser()?.getUsername()
      axios.get(`${constants.backend}/users/${userId}/future-letters/unread-count`)
        .then(res => setUnreadCount(res.data))
    } catch (e) {
      console.log(e)
    }
  })

  // if (futureLetters.filter(letter => !letter.read).length !== 0) {
  //   return (
  //     <PageContainer>
  //       <Grid container>
  //         {
  //           futureLetters.filter(letter => !letter.read).map(letter => <UnreadLetterCard letter={letter} />)
  //         }
  //       </Grid>
  //     </PageContainer>
  //   )
  // }

  return (
    <PageContainer>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: {
            xs: '20px',
            sm: '30px'
          },
          color: theme.palette.secondary.main,
        }}
      >
        A Letter to the Future
      </Box>

      <Box
        sx={{
          display: unreadCount !== 0 ? 'flex' : 'none',
          justifyContent: 'flex-end',
          pr: '100px',
        }}
      >
        <IconButton onClick={() => navigate(getUnreadLetterPageUrl())}>
          <MailOutlineIcon sx={{fontSize: '30px'}} />
        </IconButton>
      </Box>

      <FutureLetterForm />

      <Box sx={{mt: '40px'}}>
        {
          futureLetters.map(letter => <FutureLetterCard key={letter.letterId} letter={letter} />)
        }
      </Box>

    </PageContainer>
  )
}

export default FutureDiaryPage
