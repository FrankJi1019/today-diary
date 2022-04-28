import {Box} from '@mui/material'

// @ts-ignore
const PageContainer = ({children}) => {
  return (
    <Box
      sx={{
        position: 'relative',
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
      {children}
    </Box>
  )
}

export default PageContainer
