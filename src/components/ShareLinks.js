import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
} from "react-share";

const useStyles = makeStyles((theme) => ({
  sharePost: {
    display: "grid",
    textAlign: "left",
  },
  SocialLinks: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left",
    alignContent: "center",
    alignItems: "center",
    margin: "2px 0",
  },
}));
const ShareLinks = ({ postNode }) => {
  const classes = useStyles();
  return (
    <div className={classes.sharePost}>
      <div className={classes.SocialLinks}>
        <WhatsappShareButton
          url={`https://hyblog.info/${postNode.slug}`}
          title={postNode.title}
        >
          <WhatsappIcon size={36} />
        </WhatsappShareButton>
        <TwitterShareButton
          url={`https://hyblog.info/${postNode.slug}`}
          title={postNode.title}
        >
          <TwitterIcon size={36} />
        </TwitterShareButton>
        <FacebookShareButton
          url={`https://hyblog.info/${postNode.slug}`}
          quote={postNode.summary}
        >
          <FacebookIcon size={36} />
        </FacebookShareButton>
        <LinkedinShareButton
          url={`https://hyblog.info/${postNode.slug}`}
          title={postNode.title}
          description={postNode.summary}
        >
          <LinkedinIcon size={36} />
        </LinkedinShareButton>
        <TelegramShareButton url={`https://hyblog.info/${postNode.slug}`}>
          <TelegramIcon size={36} />
        </TelegramShareButton>
        <RedditShareButton
          url={`https://hyblog.info/${postNode.slug}`}
          title={postNode.title}
        >
          <RedditIcon size={36} />
        </RedditShareButton>
      </div>
    </div>
  );
};

export default ShareLinks;
