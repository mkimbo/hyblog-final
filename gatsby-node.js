const path = require('path')
const _ = require('lodash')
const moment = require('moment')
const config = {
  dateFromFormat: 'YYYY-MM-DD',
}
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: `/@papercups-io/chat-widget/`,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
        const date = moment(node.frontmatter.date, config.dateFromFormat)
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter)

        createNodeField({
          node,
          name: 'date',
          value: date.toISOString(),
        })
      }
    }
    createNodeField({ node, name: 'slug', value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postPage = path.resolve('src/templates/post.js')
  const tagPage = path.resolve('src/templates/tag.js')
  const categoryPage = path.resolve('src/templates/category.js')

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                category
                date
              }
            }
          }
        }
      }
    `
  )

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors)
    throw markdownQueryResult.errors
  }

  const tagSet = new Set()
  const categorySet = new Set()

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges

  postsEdges.forEach((edge, index) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }

    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category)
    }
    const slug = edge.node.fields.slug

    createPage({
      path: slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        next: index === postsEdges.length - 1 ? null : postsEdges[index + 1],
        prev: index === 0 ? null : postsEdges[index - 1],
      },
    })
  })

  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    })
  })
  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })
}
