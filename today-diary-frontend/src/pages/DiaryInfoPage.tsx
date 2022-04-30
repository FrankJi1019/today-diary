import {Box, IconButton} from '@mui/material'
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Diary} from "../types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getHomePageUrl} from "../routes";
import axios from "axios";
import {constants} from "../constants";
import {useAuth} from "../providers/AuthProvider";
import PageLoading from "./PageLoading";
import DiaryInfo from "../components/DiaryInfo";
import DiaryNotFound from "../components/DiaryNotFound";
import PageContainer from "./PageContainer";

const DiaryInfoPage = () => {

  const {diaryId} = useParams();
  const {state} = useLocation()
  const navigate = useNavigate()
  const {getCurrentUser} = useAuth()

  const [diary, setDiary] = useState<Diary | null>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    axios.get(`${constants.backend}/users/${getCurrentUser()?.getUsername()}/diaries/${diaryId}`)
      .then(res => {
        setDiary(res.data)
        setIsPageLoading(false)
      }, () => {
        setIsPageLoading(false)
      })
  }, [diaryId, getCurrentUser, setDiary])

  if (isPageLoading) return <PageContainer><PageLoading /></PageContainer>

  return (
    <PageContainer>
      <Box sx={{mb: '10px'}}>
        <IconButton
          onClick={() => {
            try {
              const backUrl = (state as {backUrl: string}).backUrl
              if (backUrl) {
                navigate(backUrl)
              }
            } catch (e) {
              navigate(getHomePageUrl())
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      {
        diary ? <DiaryInfo diary={diary} /> : <DiaryNotFound />
      }
    </PageContainer>
  )
}

export default DiaryInfoPage;
