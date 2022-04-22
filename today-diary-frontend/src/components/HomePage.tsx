import {Box} from "@mui/material"
import {useNavigate, useLocation} from 'react-router-dom'
import {getDiaryCreationUrl} from "../routes";
import {useAuth} from "../Providers/AuthProvider";
import HomeTimer from "./HomeTimer";

const buttonStyle = {
  width: {
    xs: '230px',
    sm: '300px',
  },
  border: '2px solid white',
  padding: '13px 0px',
  textAlign: 'center',
  fontSize: {
    xs: '17px',
    sm: '20px'
  },
  borderRadius: '9999px',
  backgroundColor: 'rgba(255, 255, 255, .15)',
  mb: '15px',
  mt: '15px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, .2)',
  }
}

const HomePage = () => {

  const navigate = useNavigate()
  const {pathname} = useLocation()

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        background: 'url(./HomeBG.jpg) no-repeat top center',
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
        }}
      >
        <Box
          sx={{
            color: 'white',
            fontSize: '30px',
            flex: '1',
            fontFamily: 'consolas',
          }}
        >
          <Box
            sx={{
              padding: '20px',
              transform: {
                xs: 'scale(0.8)',
                sm: 'scale(1)'
              }
            }}
          >
            <HomeTimer />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'flex-start',
              sm: 'center'
            },
            alignItems: 'center',
            flexDirection: 'column',
            flex: '1',
            color: 'white'
          }}
        >
          <Box
            sx={buttonStyle}
              onClick={() => {
                navigate(getDiaryCreationUrl(), {state: {backUrl: pathname}})
              }}
          >
            How's today?
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
