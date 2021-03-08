/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'
import { ThemeProvider } from '@material-ui/core'
import theme from '../Theme'
import loadable from '@loadable/component'

const ChatWidget = loadable(() => import('@papercups-io/chat-widget'))

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <ThemeProvider theme={theme}>
          <div style={{ minHeight: '100vh', backgroundColor: '#eaecee' }}>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                margin: `0 auto`,
                maxWidth: '100%',
                padding: `0px 0px 1.45rem`,
                transition: 'color 0.2s ease-out, background 0.2s ease-out',
                paddingTop: 65,
              }}
            >
              <main>{children}</main>
              <ChatWidget
                accountId="58a54c91-ff8c-4b1f-b31b-3e2a9ad82b39"
                title="Hyblog Service Center"
                subtitle="Connect with us"
                primaryColor="#110f8b"
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
              <footer
                style={{
                  paddingTop: 10,
                  textAlign: 'center',
                }}
              >
                © {new Date().getFullYear()} Official blog from
                {` `}
                <a style={{ color: 'blue' }} href="https://www.hyreads.com">
                  Hybra
                </a>
              </footer>
            </div>
          </div>
        </ThemeProvider>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
