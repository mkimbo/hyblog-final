import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share'

const useStyles = makeStyles((theme) => ({
  SocialLinks: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: '15px 0',
  },
}))
const ShareLinks = ({ postPath, postNode }) => {
  const classes = useStyles()
  return (
    <div className={classes.SocialLinks}>
      <WhatsappShareButton
        url={`https://hyblog.netlify.app/blog/${postPath}`}
        title={postNode.frontmatter.title}
      >
        <WhatsappIcon round size={36} />
      </WhatsappShareButton>
      <TwitterShareButton
        url={`https://hyblog.netlify.app/blog/${postPath}`}
        title={postNode.frontmatter.title}
      >
        <TwitterIcon round size={36} />
      </TwitterShareButton>
      <FacebookShareButton
        url={`https://hyblog.netlify.app/blog/${postPath}`}
        quote={postNode.excerpt}
      >
        <FacebookIcon round size={36} />
      </FacebookShareButton>
      <LinkedinShareButton
        url={`https://hyblog.netlify.app/blog/${postPath}`}
        title={postNode.frontmatter.title}
        description={postNode.excerpt}
      >
        <LinkedinIcon round size={36} />
      </LinkedinShareButton>
      <TelegramShareButton url={`https://hyblog.netlify.app/blog/${postPath}`}>
        <TelegramIcon round size={36} />
      </TelegramShareButton>
      <RedditShareButton
        url={`https://hyblog.netlify.app/blog/${postPath}`}
        title={postNode.frontmatter.title}
      >
        <RedditIcon round size={36} />
      </RedditShareButton>
    </div>
  )
}

export default ShareLinks
