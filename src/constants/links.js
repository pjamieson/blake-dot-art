import React from "react"
import { Link } from "gatsby"

const data = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "pro athlete portraits",
    url: "/portraits/",
  },
  {
    id: 3,
    text: "gallery",
    url: "/gallery/",
  },
  {
    id: 4,
    text: "merch",
    url: "/merch/",
  },
  {
    id: 5,
    text: "contact",
    url: "/contact/",
  },
  {
    id: 6,
    text: "team",
    url: "/team/",
  },
]

const tempLinks = data.map(link => {
  return (
    <li key={link.id}>
      <link to={link.url}>{link.text}</Link>
    </li>
  )
})

// Above could be combined here, but this is easier to follow
export default ({ styleClass }) => {
  return (
    <ul className={`page-links ${styleClass ? styleClass : ""}`}>
      {tempLinks}
    </ul>
  )
}
