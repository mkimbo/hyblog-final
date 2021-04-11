import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ProTip from '../components/ProTip'
import ShareLinks from './ShareLinks'
import { Grid, Button, Typography, Fab } from '@material-ui/core'
import { DiscussionEmbed } from 'disqus-react'
import ArticleMeta from './ArticleMeta'
import RelatedReads from './RelatedReads'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import styled from '@emotion/styled'

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
  articleFooter: {
    display: 'grid',
    justifyContent: 'left',
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
  share: {
    marginRight: '8px',
  },
  fab: {
    border: '1px #1489cc dashed',
    marginRight: '8px',
  },
  likes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottomLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignContent: 'center',
    alignItems: 'center',
  },
}))
const StyledClaps = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.8em;
  position: relative;
  button {
    outline: 0;
    background: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid lightgrey;
    font-size: 2em;
    margin-right: 8px;
    cursor: pointer;
  }
  &::before {
    content: '${(props) => '+' + props.newClaps}';
    background: var(--carbon);
    opacity: 0;
    color: white;
    padding: 8px 12px;
    border-radius: 3px;
    position: absolute;
    z-index: 1;
    top: 3px;
    left: 6px;
    transition: opacity 0.2s 1s, top 0.2s 1s;
  }
  &:active::before {
    opacity: 1;
    top: -12px;
    transition: opacity 0.2s, top 0.2s;
  }
`

export default function MainArticleContent({ postNode, title, pageViews }) {
  const classes = useStyles()
  const disqusConfig = {
    shortname: 'hyblog-1', //your site shortname here
    config: { identifier: postNode.slug, title: title },
  }
  const [clapsCounter, setClapsCounter] = useState(0)
  const [newClaps, setNewClaps] = useState(0)

  const incrementClapsCounter = () => {
    setClapsCounter((prevState) => prevState + 1)
    setNewClaps((prevState) => prevState + 1)

    firebase
      .firestore()
      .collection('claps')
      .doc(postNode.slug)
      .set({ claps: clapsCounter + 1 }) // Be careful state is updated once outside the function
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    firebase
      .firestore()
      .collection('claps')
      .doc(postNode.slug)
      .get()
      .then((res) => {
        if (!res.data()) {
          console.log('no matching document')
        } else {
          setClapsCounter(res.data().claps)
        }
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <Grid item xs={12} md={8}>
      <ArticleMeta postNode={postNode} pageViews={pageViews} />
      <Divider />
      <div
        className={classes.article}
        dangerouslySetInnerHTML={{ __html: postNode.articleText.content }}
      />
      <div className={classes.articleFooter}>
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
      </div>
      <div className={classes.likes}>
        <Fab
          color="secondary"
          aria-label="like"
          onClick={incrementClapsCounter}
          className={classes.fab}
        >
          <ThumbUpIcon
            style={{ cursor: 'pointer', fontSize: '26px' }}
            color="primary"
          />
        </Fab>
        <Typography>{clapsCounter} likes</Typography>
      </div>
      <div className={classes.bottomLine}>
        <Typography variant="h6" className={classes.share}>
          Share
        </Typography>
        <ShareLinks postNode={postNode} />
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
