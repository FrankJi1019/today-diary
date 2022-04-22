import {Box, useTheme} from "@mui/material"
import {FC} from 'react'
import {Diary} from "../types";
import moment from "moment";
import PublicIcon from '@mui/icons-material/Public';
import {useNavigate, useLocation} from "react-router-dom";
import {getDiaryInfoPageUrl} from "../routes";

interface DiaryCardProps {
  diary: Diary
}

const DiaryCard: FC<DiaryCardProps> = ({diary}) => {

  const theme = useTheme()
  const navigate = useNavigate()
  const {pathname} = useLocation()

  return (
    <Box
      onClick={() => navigate(getDiaryInfoPageUrl(diary.diaryId), {state: {backUrl: pathname}})}
      sx={{
        padding: '20px 15px',
        margin: '20px',
        borderBottom: '1px solid black',
        cursor: 'pointer',
        boxSizing: 'border=box',
        '&:hover': {
          borderColor: 'transparent',
          boxShadow: '0px 0px 7px 1px rgba(72, 61, 139, .5)',
          borderRadius: '10px',
          backgroundColor: 'white',
        },
        position: 'relative',
        transition: 'all .1s'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: '10px',
        }}
      >
        <Box
          sx={{
            fontWeight: 'bold',
            color: '#2a0336',
          }}
        >
          {moment(diary.date).format('Do MMMM YYYY')}
        </Box>
        <Box sx={{fontSize: '25px'}}>
          {String.fromCodePoint(parseInt(diary.mood, 16))}
        </Box>
      </Box>
      <Box
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          pl: '20px',
          pr: '30px'
        }}
      >
        {diary.content?.replace(/<[^>]*>?/gm, '') || ''}
      </Box>
      {
        diary.isPublic &&
          <Box
            sx={{
              position: 'absolute',
              top: {
                xs: '60px',
                sm: '10px'
              },
              right: '10px',
              color: theme.palette.primary.main
            }}
          >
            <PublicIcon />
          </Box>
      }
    </Box>
  )
}

export default DiaryCard
