import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Particles from 'react-tsparticles'
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
        position: 'relative',
      }}
    >
      <div
        style={{
          height: '100%',
        }}
      >
        <Particles
          height="90vh"
          params={{
            fpsLimit: 60,
            interactivity: {
              detectsOn: 'canvas',
              events: {
                resize: true,
              },
            },
            particles: {
              color: { value: '#110f8b' },
              links: {
                color: '#110f8b',
                distance: 100,
                enable: true,
                opacity: 1,
                width: 1,
              },
              number: { value: 100 },
              move: {
                enable: true,
              },
              opacity: {
                value: 1,
                random: true,
              },
              shape: {
                character: {
                  fill: false,
                  font: 'Verdana',
                  style: '',
                  value: '*',
                  weight: '400',
                },
                image: {
                  height: 100,
                  replace_color: true,
                  src: 'images/github.svg',
                  width: 100,
                },
                polygon: { nb_sides: 5 },
                type: 'circle',
              },
              stroke: { color: '#ffffff', width: 3 },
              size: {
                value: 10,
              },
            },
            retina_detect: true,
          }}
        />
      </div>
      <div
        style={{
          paddingTop: '25px',
          background: 'transparent',
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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
