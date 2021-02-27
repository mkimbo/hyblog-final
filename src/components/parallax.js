import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import PropTypes from 'prop-types'

export default function Parallax(props) {
  const { children } = props
  const [transform, setTransform] = useState(null)
  useEffect(() => {
    let windowScrollTop
    if (window.innerWidth >= 768) {
      windowScrollTop = window.pageYOffset / 2
    } else {
      windowScrollTop = 0
    }
    window.onload = setTransform('translate3d(0,' + windowScrollTop + 'px,0)')
  }, [])

  useEffect(() => {
    const resetTransform = () => {
      var windowScrollTop = window.pageYOffset / 2
      setTransform('translate3d(0,' + windowScrollTop + 'px,0)')
    }
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform)
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform)
      }
    }
  })

  const data = useStaticQuery(graphql`
    query parallaxImage {
      background: file(relativePath: { eq: "icon.png" }) {
        id
        childImageSharp {
          fluid(maxWidth: 600, quality: 70) {
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
        transform: transform,
        backgroundColor: '#110f8b',
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
