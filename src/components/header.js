import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, graphql, useStaticQuery } from 'gatsby'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ClearIcon from '@material-ui/icons/Clear'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/ViewList'
import InfoIcon from '@material-ui/icons/Info'
import Explore from '@material-ui/icons/Explore'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { FaBloggerB } from 'react-icons/fa'

import SocialMedia from './social-media'

const drawerWidth = 400

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const listItemVariants = {
  show: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#110f8b',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: '100vw',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100vw',
    backgroundColor: '#eaecee',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },

  linkText: {
    fontFamily: 'Roboto',
    color: 'hsla(0, 0%, 0%, 0.8)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },

  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

const Header = ({ siteTitle }) => {
  const classes = useStyles()
  const [categories, setCategories] = useState(true)
  const [open, setOpen] = React.useState(false)

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }
  function handleClick(id) {
    setCategories(!categories)
  }
  const cat = []
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              category
            }
          }
        }
      }
    }
  `)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" color="inherit">
            {siteTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ClearIcon color="primary" />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <FaBloggerB color="#0906a5" style={{fontSize: '1.5rem'}} />
              </ListItemIcon>
              <Typography className={classes.linkText}>Hyblog</Typography>
            </ListItem>
          </Link>
          <ListItem
            id="categories"
            button
            onClick={() => handleClick('categories')}
          >
            <ListItemIcon>
              <Explore color="primary" />
            </ListItemIcon>
            <Typography className={classes.linkText}>Explore</Typography>
          </ListItem>
          <Collapse in={!categories} timeout="auto" unmountOnExit>
            {data.allMarkdownRemark.edges.map((post) => {
              cat.push(post.node.frontmatter.category)
              return null
            })}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {Array.from(new Set(cat)).map((category) => (
                <Link
                  to={`/categories/${category
                    .replace(/\W+/g, '-')
                    .toLowerCase()}`}
                  key={category}
                  className={classes.categories}
                >
                  <motion.div variants={listItemVariants}>
                    <ListItem button>
                      <ListItemIcon>
                        <ChevronRight />
                      </ListItemIcon>
                      <Typography variant="body" className={classes.linkText}>
                        {category}
                      </Typography>
                    </ListItem>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </Collapse>
          <Link to="/about">
            <ListItem button>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <Typography className={classes.linkText}>Information</Typography>
            </ListItem>
          </Link>
          <a href="https://www.hyreads.com" alt="Link to Hyreads Home Page">
            <ListItem button>
              <ListItemIcon>
                <ListIcon color="primary" />
              </ListItemIcon>
              <Typography className={classes.linkText}>Hyreads</Typography>
            </ListItem>
          </a>
          <a href="https://www.hyreads.com" alt="Link to Hyreads Home Page">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <Typography className={classes.linkText}>Hybra</Typography>
            </ListItem>
          </a>
        </List>
        <SocialMedia />
      </Drawer>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
