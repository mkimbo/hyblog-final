import React, { useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Particles from 'react-tsparticles'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

export default function Parallax(props) {
  useEffect(() => {
    function debounce(func, wait = 5, immediate = true) {
      let timeout
      return function () {
        const context = this
        const args = arguments
        const later = function () {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    }
    function parallax() {
      var scrolled = window.pageYOffset
      var parallax = document.querySelector('.parallax')
      // You can adjust the 0.4 to change the speed
      var coords = scrolled * 0.5 + 'px'
      parallax.style.transform = 'translateY(' + coords + ')'
    }
    window.addEventListener('scroll', debounce(parallax))
    return () => window.removeEventListener('scroll', debounce(parallax))
  }, [])

  const data = useStaticQuery(graphql`
    query parallaxvanilla {
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
        backgroundColor: '#f7f9fc',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: '100%',
        }}
        className="parallax"
      >
        <Particles
          height="100vh"
          params={{
            fpsLimit: 60,
            interactivity: {
              detectsOn: 'canvas',
              events: {
                resize: true,
              },
            },
            particles: {
              color: { value: '#e6e6f7' },
              links: {
                color: '#c5c5d6',
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
