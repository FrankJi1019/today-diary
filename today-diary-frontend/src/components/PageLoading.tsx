import {Box, useTheme} from "@mui/material"
import ReactLoading from "react-loading";

const PageLoading = () => {

  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      <ReactLoading type='cylon' color={theme.palette.primary.main} />
    </Box>
  )
}

export default PageLoading
