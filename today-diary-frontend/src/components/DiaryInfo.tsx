import {Box, Typography, useTheme} from "@mui/material";
import moment from "moment";
import {Diary} from "../types";
import {FC} from 'react'
import Emoji from "./Emoji";

interface DiaryInfoProps {
  diary: Diary
}

const DiaryInfo: FC<DiaryInfoProps> = ({diary}) => {

  const theme = useTheme()

  return (
    <Box>
      <Box
        sx={{
          mt: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            {moment(diary.date).format('Do MMMM YYYY')}
          </Typography>
        </Box>
        <Box
          sx={{
            ml: '30px',
            fontSize: '30px',
          }}
        >
          <Emoji emoji={diary.mood} />
        </Box>
      </Box>
      <Box
        sx={{
          mt: '15px',
          padding: '20px 20px 0',
          borderTop: '1px solid ' + theme.palette.primary.main
        }}
      >
        <Box>
          {diary ? diary.content.split('\n').map(content => <Box>{content}</Box>) : ''}
        </Box>
      </Box>
    </Box>
  )
}

export default DiaryInfo
