import {useEffect, useState} from "react";
import moment from "moment";
import {Box} from "@mui/material";


const HomeTimer = () => {
  const [time, setTime] = useState(moment(new Date()).format('DD MMMM YYYY$$HH:MM:SS'))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(moment(new Date()).format('DD MMMM YYYY$$HH:mm:ss'))
    }, 1000)
    return () => {
      window.clearInterval(timer)
    }
  })

  return (
    <Box>
      {
        time.split('$$').map((t: string, i) => {
          return (
            <Box
              key={t}
              sx={{
                fontSize: i === 1 ? '45px' : 'auto',
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                }
              }}
            >
              {t}
            </Box>
          )
        })
      }
    </Box>
  )
}

export default HomeTimer
