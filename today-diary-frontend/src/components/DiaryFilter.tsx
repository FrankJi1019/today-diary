import {Box, IconButton, styled, TextField, Grid, Checkbox, FormControlLabel, Button, useTheme} from "@mui/material";
import {Filter} from "./MyDiaryPage";
import {FC} from 'react'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {useState, useEffect} from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import moment from "moment";

interface DiaryFilterProps {
  filter: Filter,
  setFilter: (filter: Filter) => void,
  onFinish: () => void,
}

const boxWidth = 330;
const mobileBoxWidth = 310;

enum View {
  FILTER, SELECT_START, SELECT_END
}

const DateFilterTitle = styled(Box)({
  fontSize: '17px',
  marginBottom: '10px',
  color: '#2187ab'
})

const DateFilterValue = styled(Box)({
  fontSize: '17px',
  color: '#2187ab',
  padding: "0px 10px 0px",
  marginBottom: '20px',
  marginLeft: '20px',
  borderBottom: '1px solid #2187ab',
  display: 'inline-block',
  cursor: 'pointer',
  "&:hover": {
    color: '#00bec2'
  }
})

const DiaryFilter: FC<DiaryFilterProps> = ({filter, setFilter, onFinish}) => {

  const theme = useTheme()

  const [view, setView] = useState<View>(View.FILTER)
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const resetSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", resetSize);
    return () => {
      window.removeEventListener("resize", resetSize);
    };
  }, []);

  const resetFilter = () => {
    setFilter({
      keyword: '',
      startDate: null,
      endDate: null,
      includePublic: true,
      includePrivate: true,
    })
    onFinish()
  }

  return (
    <Box
      sx={{
        borderRadius: '3px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 6px 1px rgba(0, 0, 0, .5)',
      }}
    >
      <Box sx={{overflow: 'hidden'}}>
        <Box
          sx={{
            display: 'flex',
            transform: view === View.FILTER ? 'translateX(0)' : `translateX(-100%)`,
            transition: 'all .5s',
            width: {xs: mobileBoxWidth + 'px', sm: boxWidth + 'px'},
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItem: 'center',
              width: {xs: mobileBoxWidth + 'px', sm: boxWidth + 'px'},
              flexShrink: '0'
            }}
          >
            <Box
              sx={{
                width: '100%',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box sx={{width: '100%', mb: '10px'}}>
                <TextField
                  color='secondary'
                  variant='standard'
                  placeholder='Search for keywords'
                  value={filter.keyword}
                  onChange={e => setFilter({...filter, keyword: e.target.value})}
                  sx={{mb: '20px', width: '100%'}}
                />
              </Box>
              {/* FROM DATE*/}
              <Grid container>
                <Grid item xs={4}>
                  <DateFilterTitle>From</DateFilterTitle>
                </Grid>
                <Grid item xs={8}>
                  <DateFilterValue
                    sx={{
                      color: filter.startDate ? 'auto' : 'transparent',
                      "&:hover": {color: filter.startDate ? 'auto' : 'transparent'}
                    }}
                    onClick={() => {setView(View.SELECT_START)}}
                  >
                    {'YYYY/MM/DD' && moment(filter.startDate).format('YYYY/MM/DD')}
                  </DateFilterValue>
                </Grid>
              </Grid>
              {/*TO DATE*/}
              <Grid container>
                <Grid item xs={4}>
                  <DateFilterTitle>To</DateFilterTitle>
                </Grid>
                <Grid item xs={8}>
                  <DateFilterValue
                    sx={{
                      color: filter.endDate ? 'auto' : 'transparent',
                      "&:hover": {color: filter.endDate ? 'auto' : 'transparent'}
                    }}
                    onClick={() => {setView(View.SELECT_END)}}
                  >
                    {'YYYY/MM/DD' && moment(filter.endDate).format('YYYY/MM/DD')}
                  </DateFilterValue>
                </Grid>
              </Grid>
              {/*public or private*/}
              <Grid container>
                <Grid xs={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FormControlLabel
                    label='Public'
                    control={
                      <Checkbox
                        color='secondary'
                        checked={filter.includePublic}
                        onChange={(newValue) => {
                          if (!filter.includePublic) {
                            setFilter({
                              ...filter,
                              includePublic: !filter.includePublic,
                              includePrivate: false,
                            })
                          } else {
                            setFilter({
                              ...filter, includePublic: !filter.includePublic
                            })
                          }
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                  />
                </Grid>
                <Grid xs={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FormControlLabel
                    label='Private'
                    control={
                      <Checkbox
                        color='secondary'
                        checked={filter.includePrivate}
                        onChange={() => {
                          if (!filter.includePrivate) {
                            setFilter({
                              ...filter,
                              includePrivate: !filter.includePrivate,
                              includePublic: false,
                            })
                          } else {
                            setFilter({
                              ...filter, includePrivate: !filter.includePrivate
                            })
                          }
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  mt: '40px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    mb: '10px'
                  }}
                >
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={onFinish}
                    sx={{
                      display: {xs: 'block', md: 'none'},
                      color: 'white',
                      borderRadius: '100px',
                      width: {
                        xs: '100%',
                        sm: boxWidth / 2.5 + 'px'
                      },
                      "&:hover": {
                        backgroundColor: '#52abc7',
                      }
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'right'}} >
                  <Button
                    variant={screenSize > theme.breakpoints.values.md ? 'contained' : 'outlined'}
                    color='secondary'
                    onClick={resetFilter}
                    sx={{
                      color: {
                        xs: theme.palette.secondary.main,
                        md: 'white'
                      },
                      borderRadius: '100px',
                      width: {
                        xs: '100%',
                        sm: boxWidth / 2.5 + 'px'
                      },
                      "&:hover": {
                        color: 'white',
                      }
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: {
                xs: mobileBoxWidth + 'px',
                sm: boxWidth + 'px'
              },
              flexShrink: '0'
            }}
          >
            <IconButton onClick={() => {setView(View.FILTER)}}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box
              sx={{
                transform: {xs: 'scale(.95)', sm: 'none'},
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={
                  view === View.SELECT_START ?
                    filter.startDate || new Date() :
                    filter.endDate || new Date()
                }
                onYearChange={() => {}}
                onChange={(newValue) => {
                  if (view === View.SELECT_START) {
                    setFilter({...filter, startDate: newValue})
                  } else {
                    setFilter({...filter, endDate: newValue})
                  }
                  setView(View.FILTER)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DiaryFilter
