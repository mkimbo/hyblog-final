const regexExcludeRobots = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|tags|categories)).*$/
const config = {
  dateFromFormat: 'YYYY-MM-DD',
  siteGATrackingID: 'UA-188439956-1',
}
module.exports = {
  siteMetadata: {
    title: `Hyblog`,
    siteUrl: `https://hyblog.netlify.app/`,
    description: `Official Blog from Hybra`,
    author: `JackMkimbo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/assets/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 672,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          config.siteGATrackingID, // Google Analytics / GA
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#fff',
        showSpinner: false,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
        threshold: 0.07,
        rootMargin: '100px 0px',
      },
    },
    'gatsby-plugin-netlify-cms',
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage(
              filter: {
                path: {
                  regex: "${regexExcludeRobots}"
                }
              }
            ) {
              edges {
                node {
                  path
                }
              }
            }
        }`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hyblog`,
        short_name: `Hyblog`,
        description: `Official Blog from Hybra`,
        start_url: `/`,
        background_color: `#110f8b`,
        theme_color: `#110f8b`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components, in conjunction to Material-UI, you should:
      // - Change the injection order
      // - Add the plugin
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
      // 'gatsby-plugin-styled-components',
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
