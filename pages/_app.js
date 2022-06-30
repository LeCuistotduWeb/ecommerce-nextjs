import '../styles/globals.css'
import {GlobalProvider} from "../state/global-context";
import {ThemeProvider} from "@material-ui/core";
import { CssBaseline } from '@material-ui/core';
import theme from '../theme/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
