import React, { useEffect } from 'react'

function ScriptComponent() {
  useEffect(() => {
    // This runs the jquery script
    const myScript = require('./script.js')
  }, [])
  return <div />
}

export default ScriptComponent
