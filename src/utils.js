const slugify = require(`slug`)

function categorify(elements) {
  const result = []

  if (elements) {
    if (elements instanceof Array) {
      elements.forEach((element) => {
        result.push(element)
      })
    } else {
      result.push(elements)
    }
  }

  return result
}

function groupify(categories, name, path, postsPerPage, createPage) {
  Object.keys(categories).forEach((category) => {
    const c = slugify(category, { lower: true })
    const length = Math.ceil(categories[category].length / postsPerPage)

    Array.from({ length: length }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${name}/${c}` : `/${name}/${c}/${i + 1}`,
        component: path,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          pages: length,
          current: i + 1,
          slug: c,
          name: category,
          sub: name
        }
      })
    })
  })
}

function distinct(post, categories, key) {
  if (post.node.frontmatter[key] instanceof Array) {
    post.node.frontmatter[key].forEach((category) => {
      if (!(category in categories)) {
        categories[category] = []
      }

      categories[category].push(post)
    })
  } else {
    if (!(post.node.frontmatter[key] in categories)) {
      categories[post.node.frontmatter[key]] = []
    }

    categories[post.node.frontmatter[key]].push(post)
  }
}

function match(a, b) {
  let result = 0

  a.forEach((left) => {
    b.forEach((right) => {
      if (left === right) {
        result++
      }
    })
  })

  return result
}

function related(post, posts, limit) {
  const related = []
  let i = posts.data.allMarkdownRemark.edges.length;

  while (i !== 0 && related.length < limit) {
    let node = posts.data.allMarkdownRemark.edges[Math.floor(Math.random() * i)].node;

    if (node.fields.slug !== post.node.fields.slug && match(node.fields.categories, post.node.fields.categories) > 0) {
      let duplicate = false

      related.forEach((r) => {
        if (r.fields.slug === node.fields.slug) {
          duplicate = true
        }
      })

      if (duplicate) {
        continue
      }

      related.push(node)
    }

    i -= 1;
  }

  return related
}

module.exports = {
  categorify: categorify,
  groupify: groupify,
  distinct: distinct,
  related: related
}
