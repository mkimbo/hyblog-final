import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import PropTypes from 'prop-types'

export default function Parallax(props) {
  let windowScrollTop
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3
  } else {
    windowScrollTop = 0
  }
  const [transform, setTransform] = React.useState(
    'translate3d(0,' + windowScrollTop + 'px,0)'
  )
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform)
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform)
      }
    }
  })
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3
    setTransform('translate3d(0,' + windowScrollTop + 'px,0)')
  }
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
        transform: transform,
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
