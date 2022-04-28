import {Box, Button, useTheme} from "@mui/material"
import {Diary} from "../types";
import DiaryCard from "../components/DiaryCard"
import {useEffect, useState} from "react";
import DiaryFilter from "../components/DiaryFilter";
import SingleFilter from "../components/SingleFilter";
import moment from "moment";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate, useLocation} from "react-router-dom";
import {getDiaryCreationUrl} from "../routes";
import axios from "axios";
import {constants} from "../constants";
import {useAuth} from "../providers/AuthProvider";
import PageLoading from "./PageLoading";
import PageContainer from "./PageContainer";

const isDiaryInFilter = (diary: Diary, filter: Filter) => {
  let isValid = true
  if (filter.keyword.trim() !== '' && diary.content?.includes(filter.keyword)) {
    isValid = false
  }
  if (filter.startDate !== null) {
    const startDate = new Date(
      filter.startDate.getFullYear(),
      filter.startDate.getMonth(),
      filter.startDate.getDate(),
      0, 0, 0)
    if (startDate.getTime() > diary.date.getTime()) isValid = false
  }
  if (filter.endDate !== null) {
    const endDate = new Date(
      filter.endDate.getFullYear(),
      filter.endDate.getMonth(),
      filter.endDate.getDate(),
      23, 59, 59)
    if (endDate.getTime() < diary.date.getTime()) isValid = false
  }
  if ((diary.isPublic && !filter.includePublic) || (!diary.isPublic && !filter.includePrivate)) isValid = false
  return isValid
}

export interface Filter {
  keyword: string,
  startDate: Date | null,
  endDate: Date | null,
  includePublic: boolean,
  includePrivate: boolean,
}

const MyDiaryPage = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const {getCurrentUser, getAccessToken} = useAuth()

  const [allDiaries, setAllDiaries] = useState<Array<Diary>>([])
  const [showFilter, setShowFilter] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>({
    keyword: '',
    startDate: null,
    endDate: null,
    includePrivate: true,
    includePublic: true,
  })
  
  useEffect(() => {
    axios.get(
      `${constants.backend}/users/${getCurrentUser()?.getUsername()}/diaries`,
      {
        headers: {
          authorization: `Bearer ${getAccessToken()}`
        }
      }
    )
      .then(res => {
        setAllDiaries(res.data)
        setIsPageLoading(false)
      })
  }, [setAllDiaries, getCurrentUser, setIsPageLoading, getAccessToken])

  return (
    <PageContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 30px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={() => setShowFilter(true)}
          onMouseLeave={() => setShowFilter(false)}
        >
          <Box
            sx={{
              cursor: 'pointer',
              color: theme.palette.secondary.main,
              ml: {
                xs: '0',
                sm: '20px'
              },
              fontSize: '19px',
              '&:hover': {
                textDecoration: 'underline'
              },
            }}
          >
            Filter
          </Box>
          {
            showFilter &&
              <Box
                sx={{
                  position: {
                    xs: 'fixed',
                    sm: 'absolute'
                  },
                  top: {
                    xs: '50%',
                    sm: '100%'
                  },
                  left: {
                    xs: '50%',
                    sm: '0'
                  },
                  transform: {
                    xs: 'translate(-50%,-50%)',
                    sm: 'none'
                  },
                  zIndex: 3,
                }}
              >
                <DiaryFilter
                  filter={filter}
                  setFilter={setFilter}
                  onFinish={() => setShowFilter(false)}
                />
              </Box>
          }
        </Box>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            navigate(getDiaryCreationUrl(), {
              state: {
                backUrl: pathname
              }
            })
          }}
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
              borderRadius: '100px'
            }
          }}
        >
          Write a diary
        </Button>
        <Box
          onClick={() => navigate(getDiaryCreationUrl())}
          sx={{
            display: {xs: 'flex', sm: 'none'},
            position: 'fixed',
            right: '30px',
            bottom: '50px',
            backgroundColor: theme.palette.secondary.main,
            width: '40px',
            height: '40px',
            borderRadius: '100px',
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            zIndex: '1',
            fontWeight: 'bold',
          }}
        >
          <AddIcon />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {xs: 'column', sm: 'row'},
          padding: '15px 30px 0px'
        }}
      >
        {
          filter.keyword.trim() !== '' &&
            <SingleFilter
              title='Keyword'
              value={filter.keyword}
              onDelete={() => setFilter({...filter, keyword: ''})}
            />
        }
        {
          filter.startDate !== null &&
            <SingleFilter
              title={'From'}
              value={moment(filter.startDate).format('YYYY/MM/DD')}
              onDelete={() => setFilter({...filter, startDate: null})}
            />
        }
        {
          filter.endDate !== null &&
            <SingleFilter
              title={'To'}
              value={moment(filter.endDate).format('YYYY/MM/DD')}
              onDelete={() => setFilter({...filter, endDate: null})}
            />
        }
        {
          filter.includePublic && !filter.includePrivate &&
            <SingleFilter
              title={'Public only'}
              onDelete={() => setFilter({...filter, includePrivate: true, includePublic: true})}
            />
        }
        {
          !filter.includePublic && filter.includePrivate &&
            <SingleFilter
              title={'Private only'}
              onDelete={() => setFilter({...filter, includePrivate: true, includePublic: true})}
            />
        }
      </Box>
      {
        isPageLoading ? <PageLoading /> :
          <Box>
            {
              allDiaries
                .filter(diary => isDiaryInFilter(diary, filter))
                .map((diary: Diary) => <DiaryCard diary={diary} key={Math.random().toString()} />)
            }
          </Box>
      }
      {
        allDiaries.filter(diary => isDiaryInFilter(diary, filter)).length === 0 && !isPageLoading &&
          <Box
            sx={{
              textAlign: 'center',
              mt: '100px',
              color: '#999'
            }}
          >
            You have no diaries to display
          </Box>
      }
    </PageContainer>
  )
}

export default MyDiaryPage
