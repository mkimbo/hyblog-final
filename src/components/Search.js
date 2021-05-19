import React from 'react'
import {
  Backdrop,
  Button,
  Container,
  Grid,
  IconButton,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: '#303030',
  },
  searchBar: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 2fr',
  },
  searchInput: {
    padding: '2px',
    color: '#1489cc',
    outline: '#1489cc',
  },
  button: {
    margin: theme.spacing(1),
  },
}))

function Search({ open, setOpen }) {
  const classes = useStyles()

  //FORM_URL to Google search
  const FORM_URL = `https://cse.google.com/cse/publicurl`

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Container>
        <Grid>
          <form
            className={classes.searchBar}
            method="get"
            title="Search Form"
            action={FORM_URL}
          >
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => {
                setOpen(!open)
              }}
            >
              <CloseIcon />
            </IconButton>

            <input
              type="text"
              id="q"
              name="q"
              className={classes.searchInput}
              title="Search this site"
              alt="Search Text"
              maxlength="256"
            />
            <input id="cx" name="cx" type="hidden" value="9e67cae636a7bbcc4" />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<SearchIcon />}
              name="submit"
              type="submit"
              id="searchSubmit"
              alt="Go"
              title="Submit Search Query"
            >
              Search
            </Button>
          </form>
        </Grid>
        <Grid>
          <div className="gcse-search"></div>
        </Grid>
      </Container>
    </Backdrop>
  )
}

export default Search
