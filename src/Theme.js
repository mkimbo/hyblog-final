import { createMuiTheme } from '@material-ui/core/styles'
import FuturaLT from './fonts/FuturaLT.ttf'

const futura = {
  fontFamily: 'FuturaLT',
  src: `
    url(${FuturaLT}) format('ttf')
  `,
}
const theme = createMuiTheme({
  typography: {
    fontFamily: 'FuturaLT, sans-serif',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [futura],
      },
    },
  },
})

export default theme
