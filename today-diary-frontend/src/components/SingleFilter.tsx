import {Box, IconButton} from "@mui/material";
import {FC} from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface SingleFilterProps {
  title: string,
  value?: string,
  onDelete: () => void,
}

const SingleFilter: FC<SingleFilterProps> = ({title, value, onDelete}) => {
  return (
    <Box
      sx={{
        padding: '0px 10px',
        border: '2px solid #2187ab',
        borderRadius: '5px',
        mr: '10px',
        mb: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{display: 'flex'}}>
        <Box
          sx={{
            mr: '3px',
            color: '#999',
            fontWeight: '600'
          }}
        >
          {title}
        </Box>
        {value && <Box>: {value}</Box>}
      </Box>
      <IconButton
        onClick={onDelete}
        sx={{color: '#DD0000'}}
      >
        <HighlightOffIcon fontSize='small' />
      </IconButton>
    </Box>
  )
}

export default SingleFilter
