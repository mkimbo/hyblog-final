import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import './test.css'
const Test = () => {
  const [refresh, setrefresh] = useState(false)
  useEffect(() => {
    return () => {
      setrefresh({ refresh: !refresh })
    }
  }, [refresh])
  return (
    <div class="css-typing">
      <Typography component="p" variant="body">
        Typed text 1
      </Typography>
      <Typography component="p" variant="body">
        Typed text 2
      </Typography>
      <Typography component="p" variant="body">
        Typed text 3
      </Typography>
    </div>
  )
}

export default Test
