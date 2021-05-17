import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { CssBaseline, Grid } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Montserrat from '@fontsource/montserrat'
import Cardo from '@fontsource/cardo'
import Roboto from '@fontsource/roboto'
import loadable from '@loadable/component'
import Notifications from 'react-notify-toast'
import { GlobalAuthProvider } from '../context/auth/auth'
import { ModalContextProvider } from '../context/modal/modal'
import Header from './Header'
import Search from './Search'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const ChatWidget = loadable(() => import('@papercups-io/chat-widget'))

export default function TopLayout(props) {
  const [open, setOpen] = useState(false)
  const [darkState, setDarkState] = useState('light')
  const [switchState, setSwitchState] = useState(false)
  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Cardo, sans-serif',
    },
    palette: {
      type: darkState,
      primary: {
        main: '#1489cc',
      },
      secondary: {
        main: '#ffffff',
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [Montserrat, Cardo, Roboto],
        },
      },
    },
  })

  const handleThemeChange = () => {
    setSwitchState(switchState === true ? false : true)
    if (darkState === 'light') {
      setDarkState('dark')
      localStorage.setItem('darkState', 'dark')
    } else {
      setDarkState('light')
      localStorage.setItem('darkState', 'light')
    }
  }

  function lightness() {
    setDarkState('light')
    setSwitchState(false)
  }
  function darkness() {
    setDarkState('dark')
    setSwitchState(true)
  }

  useEffect(() => {
    const existingPreference = localStorage.getItem('darkState')
    if (existingPreference) {
      existingPreference === 'light' ? lightness() : darkness()
    } else {
      setDarkState('light')
      localStorage.setItem('darkState', 'light')
      setSwitchState(false)
    }
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <GlobalAuthProvider>
        <ModalContextProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

          <Grid>
            <CssBaseline />
            <Helmet>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
            </Helmet>

            <Header title="HyBlog" open={open} setOpen={setOpen} />

            <Grid style={{ paddingTop: '120px' }}>
              <Notifications />
              <Search open={open} setOpen={setOpen} />
              {props.children}
            </Grid>
            <Footer
              handleThemeChange={handleThemeChange}
              darkState={switchState}
            />
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

            <ScrollToTop />
          </Grid>
        </ModalContextProvider>
      </GlobalAuthProvider>
    </ThemeProvider>
  )
}

TopLayout.propTypes = {
  children: PropTypes.node,
}
