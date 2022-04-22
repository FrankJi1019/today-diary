import {createTheme} from "@mui/material";

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    custom: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#6A5ACD',
      dark: '#352d67'
    },
    secondary: {
      main: '#4999b3'
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 620,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: 'custom'
          },
          style: {
            backgroundColor: 'red',
            borderRadius: '1000px'
          }
        }
      ]
    }
  }
})

export default theme
