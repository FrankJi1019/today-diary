import {Box, useTheme} from "@mui/material"

const DiaryNotFound = () => {

  const theme = useTheme()

  return (
    <Box
      sx={{
        textAlign: 'center',
        fontSize: '20px',
        mt: '50px',
        color: theme.palette.primary.dark,
      }}
    >
      Diary Not Found
    </Box>
  )
}

export default DiaryNotFound
