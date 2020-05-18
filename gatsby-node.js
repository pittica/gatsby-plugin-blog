const Utils = require("./src/utils")
const path = require(`path`)

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions
  const postsPerPage = options.postsPerPage || 15
  const categories = []
  const tags = []

  let filter = ``

  if (options.regex) {
    filter = `
      filter: {
        fields: {
          slug: {
            regex: "` + options.regex + `"
          }
        }
      }
    `
  }

  const posts = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 2000
          ` + filter + `
        ) {
          edges {
            node {
              fields {
                slug
                tags
                categories
              }
              frontmatter {
                title
                tags
                categories
              }
            }
          }
        }
      }
    `
  )

  if (posts.data) {
    posts.data.allMarkdownRemark.edges.forEach((post, index) => {
      if (options.templateArticle) {
        const next = index === posts.data.allMarkdownRemark.edges.length - 1 ? null : posts.data.allMarkdownRemark.edges[index + 1].node
        const previous = index === 0 ? null : posts.data.allMarkdownRemark.edges[index - 1].node

        createPage({
          path: post.node.fields.slug,
          component: path.resolve(options.templateArticle),
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
            related: Utils.related(post, posts, options.relatedPerPage || 5)
          }
        })
      }

      Utils.distinct(post, categories, "categories")
      Utils.distinct(post, tags, "tags")
    })

    if (options.templateCategory) {
      Utils.groupify(categories, "category", path.resolve(options.templateCategory), postsPerPage, createPage)
    }

    if (options.templateTag) {
      Utils.groupify(tags, "tag", path.resolve(options.templateTag), postsPerPage, createPage)
    }
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions

    createNodeField({
      name: `categories`,
      node,
      value: Utils.categorify(node.frontmatter.categories)
    })

    createNodeField({
      name: `tags`,
      node,
      value: Utils.categorify(node.frontmatter.tags)
    })
  }
}
