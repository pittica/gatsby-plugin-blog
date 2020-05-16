# pittica/gatsby-plugin-blog

![License](https://img.shields.io/github/license/pittica/gatsby-plugin-blog)
![Version](https://img.shields.io/github/package-json/v/pittica/gatsby-plugin-blog)
![Release](https://img.shields.io/github/v/release/pittica/gatsby-plugin-blog)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/pittica/gatsby-plugin-blog/dev/gatsby)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/pittica/gatsby-plugin-blog/dev/react)

## Description

Blog optimization plugin for [GatsbyJS](https://www.gatsbyjs.org/).

## Install

[![npm](https://img.shields.io/npm/v/@pittica/gatsby-plugin-blog)](https://www.npmjs.com/package/@pittica/gatsby-plugin-blog)

```shell
npm install @pittica/gatsby-plugin-blog
```

## Usage

The plugin requires **categories** and **tags** fields in each header of markdown files.

## Configuration

Edit your **gatsby-config.js**.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `@pittica/gatsby-plugin-blog`,
      options: {
        postsPerPage: 15,
        templateCategory: "./src/templates/category.js",
        templateTag: "./src/templates/tag.js",
        regex: "/^\/(blog)\//s",
      }
    },
  ],
}
```

### Attributes

The plugin has optional attributes.

#### postsPerPage

Sets the posts to display per page.

##### Default Value
`15`

#### templateCategory

Sets the path of the template used by categories.

#### templateTag

Sets the path of the template used by tags.

#### regex

Sets the regex used to filter the slug of the posts.

## Copyright

(c) 2020, Pittaca S.r.l.s.
