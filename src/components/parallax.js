import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import PropTypes from 'prop-types'

export default function Parallax(props) {
  const { children } = props

  const data = useStaticQuery(graphql`
    query parallaxImage {
      background: file(relativePath: { eq: "maskable-banner.png" }) {
        id
        childImageSharp {
          fluid(maxWidth: 1500, quality: 70) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div
      style={{
        height: '90vh',
      }}
    >
      <BackgroundImage fluid={data.background.childImageSharp.fluid}>
        {children}
      </BackgroundImage>
    </div>
  )
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
}
