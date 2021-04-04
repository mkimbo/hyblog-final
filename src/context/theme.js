import { createMuiTheme } from "@material-ui/core/styles";
import Montserrat from "@fontsource/montserrat";
import Cardo from "@fontsource/cardo";
import Roboto from "@fontsource/roboto";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Cardo, sans-serif",
  },
  palette: {
    primary: {
      main: "#1489cc",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [Montserrat, Cardo, Roboto],
      },
    },
  },
});

export default theme;
