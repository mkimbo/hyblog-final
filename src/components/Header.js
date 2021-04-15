import React, { useState, useContext } from 'react'
import { Link, graphql, useStaticQuery, navigate } from 'gatsby'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import { AuthContext } from '../context/auth/auth'
import { ModalContext } from '../context/modal/modal'
import ModalSignIn from './ModalSignIn'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    position: 'fixed',
    width: '100%',
    background: '#1489cc',
    zIndex: '10',
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontFamily: 'Roboto, sans-serif',
  },
  toolbarTitle: {
    flex: 1,
    fontFamily: 'Roboto, sans-serif',
    textDecoration: 'none',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    fontFamily: 'Roboto, sans-serif',
    flexShrink: 0,
    color: '#ffffff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  login: {
    margin: '0px 5px',
    fontFamily: 'Roboto, sans-serif',
  },
  menu: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    textShadow: '0 2px 4px #000',
  },
}))

export default function Header(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(false)
  const { title } = props
  const cat = []
  const { state, signOut } = useContext(AuthContext)
  const {
    handleOpenLoginModal,
    openLoginModal,
    handleCloseLoginModal,
  } = useContext(ModalContext)

  const onClickDropdownMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const onCloseDropdownMenu = () => {
    setAnchorEl(false)
  }
  const Signout = () => {
    signOut()
    if (window.location.pathname !== '/') {
      navigate('/')
    }
  }

  const data = useStaticQuery(graphql`
    query {
      allFlamelinkBlogPostContent {
        edges {
          node {
            id
            category
          }
        }
      }
    }
  `)
  data.allFlamelinkBlogPostContent.edges.map((post) => {
    cat.push(post.node.category)
    return null
  })
  return (
    <React.Fragment>
      <ModalSignIn open={openLoginModal} handleClose={handleCloseLoginModal} />
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Link to={'/'} className={classes.toolbarTitle}>
            <Typography
              component="h2"
              variant="h5"
              align="left"
              color="secondary"
              className={classes.toolbarTitle}
            >
              {title}
            </Typography>
          </Link>
          <IconButton>
            <SearchIcon color="secondary" />
          </IconButton>
          {state.isAuthenticated && !state.isLoading ? (
            <>
              <div
                className={classes.menu}
                onClick={onClickDropdownMenu}
                onKeyDown={onClickDropdownMenu}
                aria-controls="simple-menu"
                aria-haspopup="true"
                role="button"
              >
                <Avatar src={state.user?.photoURL || '/broken-image.jpg'} />
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                style={{ top: '6%' }}
                open={Boolean(anchorEl)}
                onClose={onCloseDropdownMenu}
              >
                <MenuItem>{state.user?.email}</MenuItem>
                <MenuItem onClick={Signout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              onClick={handleOpenLoginModal}
              variant="outlined"
              className={classes.login}
              color="secondary"
            >
              Login
            </Button>
          )}
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          {Array.from(new Set(cat)).map((category) => (
            <Link
              to={`/${category.replace(/\W+/g, '-').toLowerCase()}`}
              key={category}
              color="secondary"
              className={classes.toolbarLink}
            >
              {category}
            </Link>
          ))}
          <Link to={'#'} key="news" className={classes.toolbarLink}>
            News
          </Link>
          <Link to={'#'} key="poetry" className={classes.toolbarLink}>
            Poetry
          </Link>
        </Toolbar>
      </div>
    </React.Fragment>
  )
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
}
