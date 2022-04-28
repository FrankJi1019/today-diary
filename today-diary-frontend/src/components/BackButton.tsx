import {Box, IconButton} from '@mui/material'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {FC} from 'react'

const BackButton: FC<{backUrl: string}> = ({backUrl}) => {

  const navigate = useNavigate()

  return (
    <Box>
      <IconButton
        onClick={() => navigate(backUrl)}
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  )
}

export default BackButton
