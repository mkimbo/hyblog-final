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
