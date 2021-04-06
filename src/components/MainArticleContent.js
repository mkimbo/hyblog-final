import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ProTip from '../components/ProTip'
import { DiscussionEmbed } from 'disqus-react'
import ArticleMeta from './ArticleMeta'
import RelatedReads from './RelatedReads'
import { Button } from '@material-ui/core'
import { Link } from 'gatsby'

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Roboto, sans-serif',
  },
  article: {
    ...theme.typography.subtitle1,
    padding: theme.spacing(3, 0),
    fontFamily: 'Cardo, sans-serif',
    fontsize: '1.4rem',
  },
  category: {
    textDecoration: 'none',
  },
}))

export default function MainArticleContent({ postNode, title, pageViews }) {
  const classes = useStyles()
  const disqusConfig = {
    shortname: 'hyblog-1', //your site shortname here
    config: { identifier: postNode.slug, title: title },
  }
  return (
    <Grid item xs={12} md={8}>
      <Link
        to={`/${postNode.category.replace(/\W+/g, '-').toLowerCase()}`}
        className={classes.category}
      >
        <Button variant="contained" size="small" color="primary">
          {postNode.category}
        </Button>
      </Link>
      <Typography variant="h4" gutterBottom className={classes.title}>
        {title}
      </Typography>
      <ArticleMeta postNode={postNode} pageViews={pageViews} />
      <Divider />

      <div
        className={classes.article}
        dangerouslySetInnerHTML={{ __html: postNode.articleText.content }}
      />
      <ProTip />
      <Divider />
      <DiscussionEmbed {...disqusConfig} />
      <Divider />
      <RelatedReads
        category={postNode.category}
        tags={postNode.tags}
        currentArticleSlug={postNode.slug}
      />
    </Grid>
  )
}

MainArticleContent.propTypes = {
  postNode: PropTypes.object,
  title: PropTypes.string,
}
