const path = require('path')
const _ = require('lodash')
const readingTime = require('reading-time')
const config = {
  dateFromFormat: 'YYYY-MM-DD',
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function (
        context,
        request,
        callback
      ) {
        const regex = /^@?firebase(\/(.+))?/
        if (regex.test(request)) {
          return callback(null, `umd ${request}`)
        }
        callback()
      }),
    })
  }
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.content != null) {
    createNodeField({
      node,
      name: 'readingTime',
      value: readingTime(node.content),
    })
  }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postPage = path.resolve('src/templates/blogPostTemplate.js')
  const questionPage = path.resolve('src/templates/questionAnswerTemplate.js')
  const categoryPage = path.resolve('src/templates/categoryTemplate.js')
  const authorPage = path.resolve('src/templates/authorTemplate.js')

  const CreatePagesQueryResult = await graphql(
    `
      {
        allFlamelinkQuestionAnswerContent {
          edges {
            node {
              category
              date
              question
              questioner
              slug
              summary
            }
          }
        }
        allFlamelinkBlogPostContent {
          edges {
            node {
              title
              slug
              author
              category
              date
            }
          }
        }
      }
    `
  )

  if (CreatePagesQueryResult.errors) {
    console.error(CreatePagesQueryResult.errors)
    throw CreatePagesQueryResult.errors
  }

  const categoryList = []
  const authorList = []
  const postsEdges =
    CreatePagesQueryResult.data.allFlamelinkBlogPostContent.edges
  const questionsEdges =
    CreatePagesQueryResult.data.allFlamelinkQuestionAnswerContent.edges

  const categoryEdges = [...postsEdges, ...questionsEdges]

  postsEdges.forEach((edge) => {
    categoryList.push(edge.node.category)
    authorList.push(edge.node.author)
    const slug = edge.node.slug
    const viewer = `/${slug}`

    createPage({
      path: `/${slug}/`,
      component: postPage,
      context: {
        slug: edge.node.slug,
        viewer: viewer,
      },
    })
  })

  questionsEdges.forEach((edge) => {
    categoryList.push(edge.node.category)
    authorList.push(edge.node.author)
    const slug = edge.node.slug
    const viewer = `/${slug}`
    createPage({
      path: `/${slug}/`,
      component: questionPage,
      context: {
        slug: edge.node.slug,
        viewer: viewer,
      },
    })
  })

  Array.from(new Set(categoryList)).forEach((category) => {
    createPage({
      path: `/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })

  Array.from(new Set(authorList)).forEach((author) => {
    createPage({
      path: `/${_.kebabCase(author)}/`,
      component: authorPage,
      context: {
        author,
      },
    })
  })
}
