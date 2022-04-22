import {Box, IconButton, Switch, TextField, useTheme} from "@mui/material"
import moment from "moment";
import {useEffect, useState} from 'react'
import MUIRichTextEditor from "mui-rte";
import {stateToHTML} from 'draft-js-export-html';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useLocation} from "react-router-dom";
import {getDiaryInfoPageUrl, getHomePageUrl, getMyDiaryPageUrl} from "../routes";
import EmojiPicker from "emoji-picker-react"
import axios from "axios";
import {constants} from "../constants";
import {useAuth} from "../Providers/AuthProvider";
import {LoadingButton} from "@mui/lab";
import PageLoading from "./PageLoading";
import {ContentState, convertFromHTML, convertToRaw} from "draft-js";

const DiaryCreationForm = () => {

  const navigate = useNavigate()
  const {state} = useLocation()
  const theme = useTheme()
  const {getCurrentUser} = useAuth()

  const [content, setContent] = useState('<p>23333<br /></p>')
  const [isPublic, setIsPublic] = useState(false)
  const [emoji, setEmoji] = useState<string>('1f600')
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [buttonLoading, setButtonLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(true)
  const [isPageLoading, setIsPageLoading] = useState(true)

  const save = async (shouldNavigate: boolean) => {
    const now = new Date()
    try {
      const res = await axios.post(
        `${constants.backend}/users/${getCurrentUser()?.getUsername()}/diaries`,
        {
          author: getCurrentUser()?.getUsername(),
          date: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
          content,
          mood: emoji,
          isPublic: isPublic
        }
      )
      if (shouldNavigate)
        navigate(getDiaryInfoPageUrl(res.data.diaryId), {
          state: {
            backUrl: getMyDiaryPageUrl()
          }
        })
    } catch(e) {
      console.log(e)
    }
  }

  const HTMLToDefaultValue = (html: string) => {
    const temp = convertFromHTML(html)
    const state = ContentState.createFromBlockArray(
      temp.contentBlocks,
      temp.entityMap
    )
    const raw = convertToRaw(state)
    return JSON.stringify(raw)
  }

  useEffect(() => {
    const resetSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", resetSize);
    return () => {
      window.removeEventListener("resize", resetSize);
    };
  }, []);

  useEffect(() => {
    const now = new Date()
    const author = getCurrentUser()?.getUsername()
    const diaryId = `${author}-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
    axios.get(`${constants.backend}/users/${author}/diaries/${diaryId}`)
      .then(res => {
        setIsPageLoading(false)
        setIsUpdating(true)
        const diary = res.data
        setContent(diary.content)
        setEmoji(diary.mood)
        setIsPublic(diary.isPublic)
      }, () => {
        setIsPageLoading(false)
        setIsUpdating(false)
      })
  }, [getCurrentUser])

  return (
    <Box
      sx={{
        flex: '1',
        backgroundColor: "#fdfafe",
        padding: {
          xs: '20px 20px',
          sm: '20px 40px',
          md: '20px 100px',
          lg: '20px 200px'
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <IconButton
          onClick={() => {
            try {
              const backUrl = (state as {backUrl: string}).backUrl
              navigate(backUrl)
            } catch (e) {
              navigate(getHomePageUrl())
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'flex'
          },
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: {
            xs: '0px 10px',
            sm: '0px 30px'
          },
        }}
      >
        <Box
          sx={{
            fontSize: {
              sm: '18px',
              md: '25px',
            },
          }}
        >
          {moment(new Date()).format('Do MMMM YYYY, dddd')}
        </Box>
        <Box
          onMouseEnter={() => setOpenEmojiPicker(true)}
          onMouseLeave={() => setOpenEmojiPicker(false)}
          sx={{
            display: 'flex',
            justifyContent: 'right',
            position: 'relative',
            marginTop: {
              xs: '10px',
              sm: '0'
            },
            width: {
              xs: '100%',
              sm: 'auto'
            },
            transform: {
              xs: 'scale(.9)',
              md: 'none'
            }
          }}
        >
          <Box
            onClick={() => setOpenEmojiPicker(true)}
            sx={{
              fontSize: '30px',
              cursor: 'pointer'
            }}
          >
            {!isPageLoading && String.fromCodePoint(parseInt(emoji, 16))}
          </Box>
          <Box
            sx={{
              display: openEmojiPicker && !isPageLoading ? 'block' : 'none',
              position: 'absolute',
              right: 0,
              top: '100%',
              zIndex: 10,
              '& .emoji-categories': {
                display: 'none',
              },
              '& .emoji-search': {
                display: 'none'
              },
              '& .skin-tones-list': {
                display: 'none'
              }
            }}
          >
            <EmojiPicker
              native
              onEmojiClick={(event, data) => {
                setEmoji(data.unified)
                setOpenEmojiPicker(false)
              }}
              groupVisibility={{
                smileys_people: true,
                animals_nature: false,
                food_drink: false,
                travel_places: false,
                activities: false,
                objects: false,
                symbols: false,
                flags: false,
                recently_used: false,
              }}
            />
          </Box>
        </Box>
      </Box>
      {
        isPageLoading ? <PageLoading /> :
          <Box
            sx={{
              border: '2px solid transparent',
              margin: {
                xs: '10px 10px 0',
                sm: '10px 30px 0'
              },
              borderRadius: '3px',
              marginTop: '10px'
            }}
          >
            <Box
              sx={{
                '& #mui-rte-editor': {
                  fontSize: '18px'
                },
                visibility: openEmojiPicker && screenSize < theme.breakpoints.values.md ? 'hidden' : 'visible'
              }}
            >
              <TextField
                variant='filled'
                multiline
                rows={15}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                }}
                // onBlur={async () => {await save(false)}}
                sx={{
                  width: '100%'
                }}
              />
            </Box>
          </Box>
      }
      <Box
        sx={{
          margin: '20px 50px 0'
        }}
      >
        <Box
          sx={{
            display: isPageLoading ? 'none' : 'flex',
            justifyContent: 'right',
            mb: '10px',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              color: '#666',
              mr: '10px',
            }}
          >
            Set as public
          </Box>
          <Box
            sx={{
              transform: 'scale(1.2)',
              '& .MuiSwitch-switchBase': {
                  color: isPublic ? 'auto' : '#8676d5'
              }
            }}
          >
            <Switch
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
          }}
        >
          <LoadingButton
            variant='contained'
            sx={{
              display: isPageLoading ? 'none' : 'block',
              width: {
                xs: '100%',
                sm: 'auto'
              }
            }}
            onClick={async () => {
              setButtonLoading(true)
              await save(true)
              setButtonLoading(false)
            }}
            disabled={content.replace(/<[^>]*>?/gm, '').trim() === ''}
            loading={buttonLoading}
          >
            {isUpdating ? 'Update' : 'Save'}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}

export default DiaryCreationForm
