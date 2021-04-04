import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { CssBaseline, Grid, Container } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import loadable from '@loadable/component'

import initialTheme from '../context/theme'
import { themeReducer, initialState } from '../context/themeReducer'
import { DispatchContext } from '../context/DispatchContext'
import { GlobalAuthProvider } from '../context/auth/auth'
import { ModalContextProvider } from '../context/modal/modal'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const ChatWidget = loadable(() => import('@papercups-io/chat-widget'))

export default function TopLayout(props) {
  const [state, dispatch] = React.useReducer(themeReducer, initialState)
  const { darkMode } = state
  const theme = React.useMemo(() => {
    return createMuiTheme({
      ...initialTheme,
      palette: {
        primary: initialTheme.palette.primary,
        secondary: initialTheme.palette.secondary,
        type: darkMode ? 'dark' : 'light',
      },
    })
  }, [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <GlobalAuthProvider>
        <ModalContextProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <DispatchContext.Provider value={dispatch}>
            <CssBaseline />
            <React.Fragment>
              <Helmet>
                <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width"
                />
              </Helmet>
              <Grid container>
                <Header title="HyBlog" />
                <Grid container>
                  <main>{props.children}</main>
                </Grid>
                <ChatWidget
                  accountId="58a54c91-ff8c-4b1f-b31b-3e2a9ad82b39"
                  title="Customer Service Center"
                  subtitle="Connect with Hyblog"
                  primaryColor="#1489cc"
                  greeting="Hi there! Send us a message and we'll get back to you as soon as we can."
                  newMessagePlaceholder="Start typing..."
                  showAgentAvailability={true}
                  requireEmailUpfront={false}
                  baseUrl="https://app.papercups.io"
                  // Optionally include data about your customer here to identify them
                  // customer={{
                  //   name: __CUSTOMER__.name,
                  //   email: __CUSTOMER__.email,
                  //   external_id: __CUSTOMER__.id,
                  //   metadata: {
                  //     plan: "premium"
                  //   }
                  // }}
                />
                <Footer
                  title="Footer"
                  description="Play with the lights here for ease of reading! (A work in Progress)"
                />
                <ScrollToTop />
              </Grid>
            </React.Fragment>
          </DispatchContext.Provider>
        </ModalContextProvider>
      </GlobalAuthProvider>
    </ThemeProvider>
  )
}

TopLayout.propTypes = {
  children: PropTypes.node,
}
