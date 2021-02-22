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

const Layout2 = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery2 {
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
                paddingTop: 100,
              }}
            >
              <main>{children}</main>
              <footer
                style={{
                  paddingTop: 10,
                  textAlign: 'center',
                }}
              >
                © {new Date().getFullYear()}, Built by
                {` `}
                <a
                  style={{ color: 'blue' }}
                  href="https://jackmkimbo.netlify.app"
                >
                  Pure Awesome
                </a>
              </footer>
            </div>
          </div>
        </ThemeProvider>
      )}
    />
  )
}

Layout2.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout2
