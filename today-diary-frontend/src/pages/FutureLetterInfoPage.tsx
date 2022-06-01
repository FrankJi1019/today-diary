import PageContainer from "./PageContainer";
import {FutureLetter} from "../types";
import {useEffect, useState} from "react";
import {Box, useTheme} from "@mui/material";
import PageLoading from "./PageLoading";
import BackButton from "../components/BackButton";
import {getFutureDiaryLetterUrl} from "../routes";
import {useAuth} from "../providers/AuthProvider";
import {constants} from "../constants";
import axios from "axios";
import {useParams} from "react-router-dom";

const FutureLetterInfoPage = () => {

  const theme = useTheme()
  const {getCurrentUser} = useAuth()
  const {letterId} = useParams()

  const [letter, setLetter] = useState<FutureLetter | null>(null)

  useEffect(() => {
    try {
      const userId = getCurrentUser()?.getUsername()
      axios.get(`${constants.backend}/users/${userId}/future-letters/${letterId}`)
        .then(res => setLetter(res.data))
    } catch (e) {
      console.log(e)
    }
  }, [getCurrentUser, letterId, setLetter])

  if (letter == null) return <PageContainer><PageLoading /></PageContainer>

  return (
    <PageContainer>
      <Box>
        <BackButton backUrl={getFutureDiaryLetterUrl()} />
      </Box>
      <Box
        sx={{
          fontSize: '30px',
          color: theme.palette.primary.dark,
          textAlign: 'center'
        }}
      >
        {letter.title}
      </Box>
      <Box
        sx={{
          fontSize: '18px',
          textAlign: 'right',
          borderBottom: '1px solid #ccc',
          mb: '30px',
        }}
      >
        From {letter.fromDate}
      </Box>
      <Box>
        {letter.content.split('\n').map(content => <Box>{content}</Box>)}
      </Box>
    </PageContainer>
  )
}

export default FutureLetterInfoPage
