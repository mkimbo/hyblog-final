import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const CategoryArt = ({ filename, alt }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              absolutePath
              name
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
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
      const imageFluid = image.node.childImageSharp
        ? image.node.childImageSharp.fluid
        : null

      return (
        <div>
          <Img alt={alt} fluid={imageFluid} />
        </div>
      )
    }}
  />
)

CategoryArt.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
}

export default CategoryArt
