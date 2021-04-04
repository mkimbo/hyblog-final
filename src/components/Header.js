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
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontFamily: 'Roboto, sans-serif',
    background: '#1489cc',
    width: '100vw',
  },
  toolbarTitle: {
    flex: 1,
    fontFamily: 'Roboto, sans-serif',
    textDecoration: 'none',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    width: '100vw',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  linkText: {
    fontFamily: 'Roboto, sans-serif',
    fontsize: '1.5rem',
    cursor: 'pointer',
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
  console.log(state)
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
      <React.Fragment className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Link to={'/'} className={classes.toolbarTitle}>
            <Typography
              component="h2"
              variant="h5"
              align="left"
              color="secondary"
              noWrap
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
          <Link to={'#'} key="news" noWrap className={classes.toolbarLink}>
            <Typography
              variant="body2"
              color="primary"
              className={classes.linkText}
            >
              News
            </Typography>
          </Link>
          <Link
            to={'#'}
            key="covid"
            color="primary"
            className={classes.toolbarLink}
          >
            <Typography
              variant="body2"
              color="primary"
              className={classes.linkText}
            >
              Covid-19
            </Typography>
          </Link>
          <Link to={'#'} key="poetry" noWrap className={classes.toolbarLink}>
            <Typography
              variant="body2"
              color="primary"
              className={classes.linkText}
            >
              Poetry
            </Typography>
          </Link>
          {Array.from(new Set(cat)).map((category) => (
            <Link
              to={`/${category.replace(/\W+/g, '-').toLowerCase()}`}
              key={category}
              noWrap
              className={classes.toolbarLink}
            >
              <Typography
                variant="body2"
                color="primary"
                className={classes.linkText}
              >
                {category}
              </Typography>
            </Link>
          ))}
        </Toolbar>
      </React.Fragment>
    </React.Fragment>
  )
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
}
