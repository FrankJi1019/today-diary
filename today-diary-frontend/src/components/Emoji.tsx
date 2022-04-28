import {Box} from '@mui/material'
import {FC} from 'react'

const Emoji: FC<{emoji: string}> = ({emoji}) => {
  return (
    <Box>
      {String.fromCodePoint(parseInt(emoji, 16))}
    </Box>
  )
}

export default Emoji
