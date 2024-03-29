import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SchemaOrg from './SchemaOrg'

const SEO = ({
  pageTitle,
  pageSlug,
  pageDescription,
  blog,
  postImage,
  isBlogPost,
}) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            author {
              name
            }
            organization {
              name
              url
              logo
            }
            social {
              twitter
              fbAppID
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const postMeta = blog ? blog : null

      const title = pageTitle ? `${pageTitle} | ${seo.title}` : seo.title
      const description = isBlogPost ? postMeta.summary : pageDescription
      const image = postImage ? `${seo.siteUrl}${postImage}` : `${seo.image}`
      const url = postMeta
        ? `${seo.siteUrl}/${postMeta.slug}/`
        : `${seo.siteUrl}${pageSlug}`
      const datePublished = isBlogPost ? postMeta.date : false
      const author = isBlogPost ? postMeta.author : seo.author.name
      return (
        <React.Fragment>
          <Helmet htmlAttributes={{ lang: `en` }}>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={image} />
            <link rel="canonical" href={url} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="fb:app_id" content={seo.social.fbAppID} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={seo.social.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            siteUrl={seo.siteUrl}
            author={author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </React.Fragment>
      )
    }}
  />
)

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postTitle: PropTypes.string,
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postTitle: null,
  pageDescription: null,
  postImage: null,
  blog: null,
  pageSlug: null,
}

export default SEO
