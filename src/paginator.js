import React, { Component } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

export default class Paginator extends Component {
  render() {
    if (this.props.context.pages > 1) {
      return (
        <nav className={this.props.className}>
          <ul>
            {this.paginate(this.props.context)}
          </ul>
        </nav>
      )
    } else {
      return null
    }
  }

  ellipsis(upper) {
    return (
      <li key={"page-" + (upper ? "ellipsis-upper" : "ellipsis-lower")}>
        <span>...</span>
      </li>
    )
  }

  item(context, page) {
    let link = ""

    if (context.sub) {
      link += "/" + context.sub
    }

    if (context.slug) {
      link += "/" + context.slug
    }

    if (page > 1) {
      link += "/" + page
    }

    return (
      <li key={"page-" + page}>
        <Link
          to={link}
          className={classNames({
            current: context.current === page
          })}
        >
          {page}
        </Link>
      </li>
    )
  }

  paginate(context) {
    let items = []

    if (context.pages > 1) {
      items.push(this.item(context, 1))

      if (context.current > 3) {
        items.push(this.ellipsis(false))
      }
    }

    for (let i = 0; i < context.pages; i++) {
      let page = i + 1

      if (page !== 1 && page !== context.pages && (page < (context.current + 2) && page > (context.current - 2))) {
        items.push(this.item(context, page))
      }
    }

    if (context.pages > 1) {
      if (context.current < (context.pages - 2)) {
        items.push(this.ellipsis(true))
      }

      items.push(this.item(context, context.pages))
    }

    return items
  }
}
