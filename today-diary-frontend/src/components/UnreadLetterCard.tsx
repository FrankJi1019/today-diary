import {Box, Grid, useTheme} from '@mui/material'
import {FC} from 'react'
import {FutureLetter} from "../types";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {getFutureDiaryLetterInfoPageUrl} from "../routes";
import {useAuth} from "../providers/AuthProvider";
import {constants} from "../constants";
import axios from "axios";

const UnreadLetterCard: FC<{letter: FutureLetter}> = ({letter}) => {

  const theme = useTheme()
  const navigate = useNavigate()
  const {getCurrentUser} = useAuth()

  if (letter.read) return null

  const onClick = async () => {
    try {
      const userId = getCurrentUser()?.getUsername()
      const res = await axios.patch(`${constants.backend}/users/${userId}/future-letters/${letter.letterId}/read`)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
    navigate(getFutureDiaryLetterInfoPageUrl(letter.letterId))
  }

  return (
    <Grid item xs={12} sm={6} md={4}
      sx={{
        padding: '20px 20px',
      }}
    >
      <Grid container
        sx={{
          padding: '15px 30px',
          borderRadius: '100px',
          boxShadow: 'inset 0px 0px 15px 1px ' + theme.palette.primary.main,
          cursor: 'pointer',
          // background: `linear-gradient(to right, lightblue, lightgreen)`,
          '&:hover': {
            boxShadow: 'inset 0px 0px 10px 1px ' + theme.palette.primary.main
          },
          fontSize: {
            xs: '14px',
            sm: '14px',
            md: '16px'
          },
        }}
        onClick={onClick}
      >
        <Grid item xs={6}>
          <Box sx={{textAlign: 'center'}}>
            From
          </Box>
          <Box sx={{textAlign: 'center', fontWeight: 'bold'}}>
            {moment(letter.fromDate).format('YYYY-MM-DD')}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{textAlign: 'center'}}>
            To
          </Box>
          <Box sx={{textAlign: 'center', fontWeight: 'bold'}}>
            {moment(letter.toDate).format('YYYY-MM-DD')}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UnreadLetterCard
