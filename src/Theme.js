import { createMuiTheme } from '@material-ui/core/styles'
import Montserrat from '@fontsource/montserrat'
import Cardo from '@fontsource/cardo'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Cardo, sans-serif',
  },
  palette: {
    primary: {
      main: '#0906a5',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Montserrat, Cardo],
      },
    },
  },
})

export default theme
