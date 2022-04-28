import {Box, useTheme} from '@mui/material'
import {FC} from 'react'
import {FutureLetter} from "../types";
import {useNavigate} from "react-router-dom";
import {getFutureDiaryLetterInfoPageUrl} from "../routes";

const FutureLetterCard: FC<{letter: FutureLetter}> = ({letter}) => {

  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box
      onClick={() => navigate(getFutureDiaryLetterInfoPageUrl(letter.letterId))}
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
          fontSize: {
            xs: '16px',
            sm: '18px'
          },
          color: theme.palette.primary.main,
          mb: '7px'
        }}
      >
        <Box
          sx={{
            mr: {
              xs: '10px',
              sm: '20px'
            }
          }}
        >
          From <strong>{letter.fromDate}</strong>
        </Box>
        <Box>
          To <strong>{letter.toDate}</strong>
        </Box>
      </Box>
      <Box
        sx={{
          fontSize: '18px',
          pl: '20px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {letter.title}
      </Box>
    </Box>
  )
}

export default FutureLetterCard

