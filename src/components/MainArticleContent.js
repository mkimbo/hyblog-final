import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ProTip from '../components/ProTip'
import ArticleMeta from './ArticleMeta'
import RelatedReads from './RelatedReads'

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
}))

export default function MainArticleContent({ postNode, title, pageViews }) {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        {title}{' '}
        <em style={{ fontSize: 'smaller', fontFamily: 'Cardo, sans-serif' }}>
          {`by ${postNode.author}`}
        </em>
      </Typography>
      <ArticleMeta postNode={postNode} pageViews={pageViews} />
      <Divider />

      <div
        className={classes.article}
        dangerouslySetInnerHTML={{ __html: postNode.articleText.content }}
      />
      <ProTip />
      <Divider />
      <RelatedReads
        category={postNode.category}
        tags={postNode.tags}
        currentArticleSlug={postNode.slug}
      />
      <Divider />
    </Grid>
  )
}

MainArticleContent.propTypes = {
  postNode: PropTypes.object,
  title: PropTypes.string,
}
