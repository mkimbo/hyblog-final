const path = require('path')
const _ = require('lodash')
const readingTime = require('reading-time')
const config = {
  dateFromFormat: 'YYYY-MM-DD',
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-html') {
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

  const categorySet = new Set()

  const postsEdges =
    CreatePagesQueryResult.data.allFlamelinkBlogPostContent.edges
  const questionsEdges =
    CreatePagesQueryResult.data.allFlamelinkQuestionAnswerContent.edges

  const categoryEdges = [...postsEdges, ...questionsEdges]

  categoryEdges.forEach((edge, index) => {
    if (edge.node.category) {
      categorySet.add(edge.node.category)
    }
    const slug = edge.node.slug
    const viewer = `/${slug}`

    createPage({
      path: `/${slug}/`,
      component: postPage,
      context: {
        slug: edge.node.slug,
        next: index === postsEdges.length - 1 ? null : postsEdges[index + 1],
        prev: index === 0 ? null : postsEdges[index - 1],
        viewer: viewer,
      },
    })
  })

  questionsEdges.forEach((edge, index) => {
    const slug = edge.node.slug
    const viewer = `/${slug}`
    createPage({
      path: `/${slug}/`,
      component: questionPage,
      context: {
        slug: edge.node.slug,
        next: index === postsEdges.length - 1 ? null : postsEdges[index + 1],
        prev: index === 0 ? null : postsEdges[index - 1],
        viewer: viewer,
      },
    })
  })

  categorySet.forEach((category) => {
    createPage({
      path: `${_.kebabCase(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })
}
