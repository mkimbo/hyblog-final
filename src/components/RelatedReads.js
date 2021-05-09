import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import SimilarArticle from './SimilarArticle'
import { SimilarArticlesFactory } from './SimilarityFactory'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
  },
  similarArticles: {
    display: 'grid',
    alignItems: 'left',
    gridTemplateColumns: '1fr 1fr',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
    margin: '0px auto',
  },
}))
const RelatedReads = ({ articles }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Typography variant="h5" gutterBottom>
        You'll Also Like
      </Typography>
      <Grid item xs={12} className={classes.similarArticles}>
        {articles.map((article, i) => (
          <Grid item xs={12} key={i}>
            <SimilarArticle blog={article.article} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

// (1.) Query for articles
export default (props) => (
  <StaticQuery
    query={graphql`
      query SimilarArticles {
        allFlamelinkBlogPostContent(
          limit: 2000
          sort: { fields: [date], order: DESC }
        ) {
          edges {
            node {
              title
              slug
              author
              category
              date
              flamelink_id
              summary
              tags
              coverImage {
                localFile {
                  name
                  childImageSharp {
                    fluid(webpQuality: 10) {
                      tracedSVG
                      srcWebp
                    }
                  }
                }
              }
            }
          }
        }
        allFlamelinkQuestionAnswerContent {
          edges {
            node {
              category
              date
              flamelink_id
              question
              questioner
              slug
              author
              tags
              summary
              coverImage {
                localFile {
                  name
                  childImageSharp {
                    fluid {
                      srcWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const { category, tags, currentArticleSlug } = props

      // (2.) Marshall the response into articles
      const posts = data.allFlamelinkBlogPostContent.edges
      const questions = data.allFlamelinkQuestionAnswerContent.edges
      const articles = [...posts, ...questions]

      // (3.) Use a SimilarArticlesFactory to get my similar articles
      const similarArticles = new SimilarArticlesFactory(
        articles,
        currentArticleSlug
      )
        .setMaxArticles(4)
        .setCategory(category)
        .setTags(tags)
        .getArticles()

      // (4.) Render it
      return <RelatedReads articles={similarArticles} />
    }}
  />
)
