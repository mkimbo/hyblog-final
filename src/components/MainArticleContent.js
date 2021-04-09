import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import ProTip from '../components/ProTip'
import Button from '@material-ui/core/Button'
import { DiscussionEmbed } from 'disqus-react'
import ArticleMeta from './ArticleMeta'
import RelatedReads from './RelatedReads'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

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
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignContent: 'center',
    alignItems: 'center',
    margin: '2px 0',
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
      <ArticleMeta postNode={postNode} pageViews={pageViews} />
      <Divider />
      <div
        className={classes.article}
        dangerouslySetInnerHTML={{ __html: postNode.articleText.content }}
      />
      <div className={classes.tags}>
        {postNode.tags.map((tag, index) => {
          return (
            <Button
              key={index}
              variant="text"
              color="inherit"
              size="small"
              startIcon={<LocalOfferIcon color="primary" />}
            >
              {tag}
            </Button>
          )
        })}
      </div>
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
