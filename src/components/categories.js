import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  categoryList: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyItems: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: '15px',
    justifyContent: 'center',
  },
  button: {
    margin: '3px',
  },
}))
const CategoryList = ({ tags }) => {
  const classes = useStyles()
  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={(data) => (
        <div className={classes.categoryList}>
          {data.allMarkdownRemark.edges.map((post) => (
            <Link
              to={`/categories/${post.node.frontmatter.category
                .replace(/\W+/g, '-')
                .toLowerCase()}`}
            >
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                size="small"
              >
                {post.node.frontmatter.category}
              </Button>
            </Link>
          ))}
        </div>
      )}
    />
  )
}

export default CategoryList
