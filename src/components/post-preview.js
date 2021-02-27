import React from 'react'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'

import PostCover from '../components/post-cover'
import PostTags from '../components/post-tags'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    margin: 'auto',
    marginBottom: '50px',
    borderRadius: '2%',
    backgroundColor: '#eaecee',
    display: 'grid',
    padding: '3px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  excerpt: {
    textDecoration: 'underline',
    color: 'hsla(0, 0%, 0%, 0.8)',
    fontsize: '1.1rem',
  },
  actionArea: {
    height: '90%',
  },
  imagePreview: {
    width: '100%',
  },
  title: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    textRendering: 'optimizelegibility',
    fontSize: '1.62671rem',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}))

const PostPreview = ({ postEdges }) => {
  const classes = useStyles()
  return (
    <div>
      {postEdges.map((post) => (
        <div
          data-sal="slide-up"
          data-sal-easing="ease"
          data-sal-duration="700"
          key={post.node.id}
        >
          <Card className={classes.root} raised>
            <Link to={`${post.node.fields.slug}`}>
              <CardActionArea>
                <PostCover
                  className={classes.imagePreview}
                  filename={post.node.frontmatter.cover}
                  alt={post.node.frontmatter.title}
                />
                <Typography
                  variant="h5"
                  component="h4"
                  color="primary"
                  className={classes.title}
                >
                  {post.node.frontmatter.title}
                </Typography>
              </CardActionArea>

              <div
                className={classes.excerpt}
                dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
              />
            </Link>
            <PostTags tags={post.node.frontmatter.tags} />
          </Card>
        </div>
      ))}
    </div>
  )
}

export default PostPreview
