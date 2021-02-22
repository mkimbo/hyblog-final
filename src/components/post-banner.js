import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PostBanner = ({ filename, alt }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              absolutePath
              name
              childImageSharp {
                fluid(maxHeight: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((n) =>
        n.node.absolutePath.includes(filename)
      )

      if (!image) return null

      const imageFluid = image.node.childImageSharp.fluid
      return (
        <div>
          <Img alt={alt} fluid={imageFluid} style={{ height: '400px' }} />
        </div>
      )
    }}
  />
)

PostBanner.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
}

export default PostBanner
