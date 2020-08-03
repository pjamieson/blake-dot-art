import React, { useState, useContext } from "react"
import { Link } from "gatsby"

import { CartContext } from "../context/cart-context"

import SocialLinks from "../constants/sociallinks"

import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavItem,
} from "mdbreact"

import logo from "../images/blake-logo-108x70.png"

const Navbar = () => {
  const { cart } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="navbar fixed-top navbar-expand-md navbar-light bg-light">
      <div className="container">

        <MDBNavbarBrand>
          <Link to="/" className="navbar-brand">
            <img src={logo} className="logo" alt="Logo"/>
            <strong>blake [dot] art</strong>
          </Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>

            <MDBNavItem>
              <MDBDropdown>

                <MDBDropdownToggle nav caret>
                  <div className="d-inline">Portfolio</div>
                </MDBDropdownToggle>

                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/athlete-portraits/">Athlete Portraits</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/other-portraits/">Other Portraits</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/other-subjects/">Other Subjects</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/felix-series/">Felix the Cat Series</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/abstracts/">Abstracts</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/hats/">Hats, Bats & Balls</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              </MDBNavItem>

              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-inline">Gallery</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/athlete-portraits/">Athlete Portraits</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/other-portraits/">Other Portraits</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/other-subjects/">Other Subjects</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/felix-series/">Felix the Cat Series</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/abstracts/">Abstracts</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/hats/">Hats, Bats & Balls</Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-inline">Merch</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/merch/topps2020/">Topps Project 2020</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <a className="menu-link" href="https://blakespuzzles.com" target="_blank" rel="noopener noreferrer">Jigsaw Puzzles</a>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/merch/card-art/">Card Art</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-inline">Contact</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem>
                  <Link className="menu-link" to="/contact/newsletter/">Newsletter Signup</Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link className="menu-link" to="/contact/question/">Ask a Question</Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link className="menu-link" to="/contact/comment/">Make a Comment</Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link className="menu-link" to="/contact/project/">Start a Project</Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link className="menu-link" to="/contact/autograph/">Autograph Request</Link>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            </MDBNavItem>

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-inline">About</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/blake/">Blake</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/team/">#TeamBlake</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/press/">Press</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/clients/">Clients & Collectors</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav right>
            {(cart && cart.length > 0) &&
              <MDBNavItem>
                <Link className="cart-link" to="/cart/">
                  <MDBIcon className="cart-icon success-text" icon="shopping-cart" size="2x" />
                  <p className="cart-count">{cart.length}</p>
                </Link>
              </MDBNavItem>
            }
            <MDBNavItem>
              <SocialLinks />
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </div>
    </div>
  )
}

export default Navbar
