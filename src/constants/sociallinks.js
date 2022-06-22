import React from "react"
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube
} from "react-icons/fa"
// FaFacebook,

const data = [
  {
    id: 1,
    icon: <FaYoutube className="social-icon fa-lg"></FaYoutube>,
    url: "https://www.youtube.com/user/BlakeJamieson",
  },
  {
    id: 2,
    icon: <FaInstagram className="social-icon fa-lg"></FaInstagram>,
    url: "https://www.instagram.com/athlete.portraits/",
  },
  {
    id: 3,
    icon: <FaTwitter className="social-icon fa-lg"></FaTwitter>,
    url: "https://twitter.com/blakejamieson",
  },
  {
    id: 4,
    icon: <FaLinkedin className="social-icon fa-lg"></FaLinkedin>,
    url: "https://www.linkedin.com/in/blakejamieson/",
  },
]

const links = data.map(link => {
  return (
    <li key={link.id}>
      <a href={link.url} className="social-link nav-link waves-effect waves-light" target="_blank" rel="noreferrer">
        {link.icon}
      </a>
    </li>
  )
})

// Above could be combined here, but this is easier to follow
const SocialLinks = ({ styleClass }) => {
  return (
    <ul className={`social-links ${styleClass ? styleClass : ""}`}>
      {links}
    </ul>
  )
}
export default SocialLinks;
