import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import SchemaOrg from "./SchemaOrg";

const SEO = ({ pageTitle, blog, postImage, isBlogPost }) => (
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
      const postMeta = blog ? blog : null;

      const title = isBlogPost ? postMeta.title : seo.title;
      const description = postMeta ? postMeta.summary : seo.description;
      const image = postImage
        ? `${seo.siteUrl}${postImage}`
        : `${seo.siteUrl}${seo.image}`;
      const url = postMeta ? `${seo.siteUrl}/${postMeta.slug}/` : seo.siteUrl;
      const datePublished = isBlogPost ? postMeta.date : false;
      console.log(blog);
      return (
        <React.Fragment>
          <Helmet>
            {/* General tags */}
            <title>{pageTitle ? `${pageTitle} | ${seo.title}` : title}</title>
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
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </React.Fragment>
      );
    }}
  />
);

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postTitle: PropTypes.string,
  postImage: PropTypes.string,
};

SEO.defaultProps = {
  isBlogPost: false,
  postTitle: null,
  postImage: null,
  blog: null,
};

export default SEO;
