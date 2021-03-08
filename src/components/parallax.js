import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

export default function Parallax(props) {
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
          fixed(width: 300, height: 300, quality: 90) {
            ...GatsbyImageSharpFixed
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
        backgroundColor: '#f7f9fc',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          paddingTop: '25px',
        }}
      >
        <Img fixed={data.background.childImageSharp.fixed} />
      </div>
    </div>
  )
}

Parallax.propTypes = {
  className: PropTypes.string,
}
