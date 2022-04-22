import {Box} from "@mui/material"
import {Diary} from "../types";
import {useEffect, useState} from 'react'
import PublicDiaryCard from "./PublicDiaryCard";
import axios from "axios";
import {constants} from "../constants";
import {useAuth} from "../Providers/AuthProvider";
import PageLoading from "./PageLoading";

const PublicDiaryPage = () => {

  const {getCurrentUser} = useAuth()

  const [diaries, setDiaries] = useState<Array<Diary>>([])
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    axios.get(`${constants.backend}/users/${getCurrentUser()?.getUsername()}/diaries/public`)
      .then(res => {
        setDiaries(res.data)
        setIsPageLoading(false)
      })
  }, [getCurrentUser, setDiaries])

  return (
    <Box
      sx={{
        flex: '1',
        backgroundColor: "#fdfafe",
        padding: {
          xs: '20px 20px',
          sm: '20px 40px',
          md: '20px 100px',
          lg: '20px 200px'
        },
      }}
    >
      {
        isPageLoading ? <PageLoading /> :
          diaries.map(diary => <PublicDiaryCard diary={diary} key={JSON.stringify(diary)} /> )
      }
      {
        diaries.length === 0 && !isPageLoading &&
        <Box
          sx={{
            textAlign: 'center',
            mt: '100px',
            color: '#999'
          }}
        >
          There are no public diaries
        </Box>
      }
    </Box>
  )
}

export default PublicDiaryPage
