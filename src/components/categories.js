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
  const cat = []
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
          {data.allMarkdownRemark.edges.map((post) => {
            cat.push(post.node.frontmatter.category)
            return null
          })}
          {Array.from(new Set(cat)).map((category) => (
            <Link
              to={`/categories/${category.replace(/\W+/g, '-').toLowerCase()}`}
              key={category}
            >
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                size="small"
              >
                {category}
              </Button>
            </Link>
          ))}
        </div>
      )}
    />
  )
}

export default CategoryList
