import {Box, Button, ButtonGroup, IconButton, useTheme} from '@mui/material'
import FutureLetterForm from "../components/FutureLetterForm";
import {FutureLetter} from "../types";
import {useEffect, useState} from "react";
import FutureLetterCard from "../components/FutureLetterCard";
import PageContainer from "./PageContainer";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useNavigate} from "react-router-dom";
import {getUnreadLetterPageUrl} from "../routes";
import axios from "axios";
import {constants} from "../constants";
import {useAuth} from "../providers/AuthProvider";
import Modal, {ModalContent} from "../components/MyModal"
import {useUtil} from "../providers/UtilProvider";

const FutureLetterPage = () => {

  const navigate = useNavigate()
  const {getCurrentUser} = useAuth()
  const theme = useTheme()
  const {screenSize} = useUtil()

  const [futureLetters, setFutureLetters] = useState<Array<FutureLetter>>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [rightContent, setRightContent] = useState<'past-letter' | 'form'>('past-letter')
  const [modal, setModal] = useState<null | ModalContent>(null)

  useEffect(() => {
    try {
      const useId = getCurrentUser()?.getUsername()
      axios.get(`${constants.backend}/users/${useId}/future-letters?filter=read`)
        .then(res => setFutureLetters(res.data))
    } catch (e) {
      console.log(e)
    }
  }, [getCurrentUser, setFutureLetters])

  useEffect(() => {
    try {
      const userId = getCurrentUser()?.getUsername()
      axios.get(`${constants.backend}/users/${userId}/future-letters/unread-count`)
        .then(res => setUnreadCount(res.data))
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <PageContainer>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'block',
            md: 'flex'
          },
          position: 'absolute',
          top: '20px',
          bottom: '20px',
          left: {
            xs: '20px',
            sm: '40px',
            md: '100px',
            lg: '200px'
          },
          right: {
            xs: '20px',
            sm: '40px',
            md: '100px',
            lg: '200px'
          },
        }}
      >
        <Box
          sx={{
            display: unreadCount !== 0 ? 'block' : 'none',
            position: 'absolute',
            justifyContent: 'flex-end',
            pr: '100px',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'red',
              width: '10px',
              height: '10px',
              position: 'absolute',
              top: '9px',
              left: '7px',
              borderRadius: '100px',
              zIndex: 2
            }}
          />
          <IconButton onClick={() => navigate(getUnreadLetterPageUrl())}>
            <MailOutlineIcon sx={{fontSize: '30px'}} />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: '2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              fontSize: {
                xs: '20px',
                sm: '40px'
              },
              transform: {
                xs: 'none',
                sm: 'none',
                md: 'translateY(-50px)'
              },
              fontWeight: 'bold',
              color: '#1dbf00',
              display: {
                xs: 'flex',
                sm: 'flex',
                md: 'block'
              },
              justifyContent: 'center',
              mb: '20px'
            }}
          >
            <Box
              sx={{
                transform: {
                  xs: 'none',
                  sm: 'none',
                  md: 'translateX(-50px)'
                },
              }}
            >
              A Letter<span>&nbsp;</span>
            </Box>
            <Box>
              to the Future
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: '3'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <ButtonGroup
              color='secondary'
              orientation={screenSize > theme.breakpoints.values.sm ? 'horizontal' : 'vertical'}
            >
              <Button
                onClick={() => setRightContent('past-letter')}
                variant={rightContent === 'past-letter' ? 'contained' : 'outlined'}
                sx={{width: '190px'}}
              >
                Past Letters
              </Button>
              <Button
                onClick={() => setRightContent('form')}
                variant={rightContent === 'form' ? 'contained' : 'outlined'}
                sx={{width: '190px'}}
              >
                Write new letter
              </Button>
            </ButtonGroup>
          </Box>
          <Box>
            {
              rightContent === 'past-letter' ?
                <Box sx={{mt: '40px'}}>
                  {
                    futureLetters.map(letter => <FutureLetterCard key={letter.letterId} letter={letter} />)
                  }
                </Box> :
                <Box sx={{mt: '40px'}}>
                  <FutureLetterForm
                    setModal={setModal}
                  />
                </Box>
            }
          </Box>
        </Box>
      </Box>
      <Modal
        open={Boolean(modal)}
        title={modal ? modal.title : ''}
        content={modal ? modal.content : ''}
        icon={modal?.icon}
        onClose={() => setModal(null)}
      />
    </PageContainer>
  )
}

export default FutureLetterPage
