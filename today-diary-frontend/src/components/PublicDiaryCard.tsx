import {Box} from '@mui/material'
import {Diary} from "../types";
import {FC} from 'react'
import moment from "moment";
import {useNavigate, useLocation} from "react-router-dom";
import {getDiaryInfoPageUrl} from "../routes";

interface PublicDiaryCardProps {
  diary: Diary
}

const PublicDiaryCard: FC<PublicDiaryCardProps> = ({diary}) => {

  const navigate = useNavigate();
  const {pathname} = useLocation()

  return (
    <Box
      onClick={() => {
        navigate(getDiaryInfoPageUrl(diary.diaryId), {
          state: {
            backUrl: pathname
          }
        })
      }}
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
          mb: '10px',
          fontWeight: 'bold',
          color: '#2a0336',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
          {diary.author + ': ' + moment(diary.date).format('Do MMMM YYYY')}
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
    </Box>
  )
}

export default PublicDiaryCard
