import {Box} from "@mui/material"
import {Diary} from "../types";
import {useEffect, useState} from 'react'
import PublicDiaryCard from "../components/PublicDiaryCard";
import axios from "axios";
import {constants} from "../constants";
import {useAuth} from "../providers/AuthProvider";
import PageLoading from "./PageLoading";
import PageContainer from "./PageContainer";

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

  if (isPageLoading) return <PageContainer><PageLoading /></PageContainer>

  return (
    <PageContainer>
      {
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
    </PageContainer>
  )
}

export default PublicDiaryPage
