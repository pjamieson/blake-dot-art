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
                    <Link className="menu-link" to="/portfolio/pop-art/">Pop Art</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/abstracts/">Abstracts</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/prints/">Prints</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/collabs/">Collabs</Link>
                  </MDBDropdownItem>
                  <div class="dropdown-divider"></div>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/portfolio/clients/">Clients & Collectors</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              </MDBNavItem>

              <MDBNavItem>
                <MDBDropdown>

                <MDBDropdownToggle nav>
                  <div className="nav-menu-item">
                    <p className="dropdown-toggle" caret="true">Gallery</p>
                    <p>(For Sale)</p>
                  </div>
                </MDBDropdownToggle>

                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/athlete-portraits/">Athlete Portraits</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/pop-art/">Pop Art</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/abstracts/">Abstracts</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/prints/">Prints</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/collabs/">Collabs</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/gallery/painted-objects/">Painted Objects</Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavItem>

            <MDBNavItem>
              <Link className="nav-link" to="/merch/topps2020/">
                <div className="nav-menu-item">
                  <p>Topps</p>
                  <p>Project 2020</p>
                </div>
              </Link>
            </MDBNavItem>

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-inline">Merch</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem>
                  <a className="menu-link" href="https://cardart.com" target="_blank" rel="noopener noreferrer">CardArt</a>
                </MDBDropdownItem>
                  <MDBDropdownItem>
                    <a className="menu-link" href="https://www.proathleteportraits.com/hats-bats-and-balls" target="_blank" rel="noopener noreferrer">Hats, Bats & Balls</a>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <a className="menu-link" href="https://blakespuzzles.com" target="_blank" rel="noopener noreferrer">Jigsaw Puzzles</a>
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
                    <Link className="menu-link" to="/about/team/">#TeamBlake</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/press/">Press</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/contact/">Contact</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav right>
            <MDBNavItem>
              <SocialLinks />
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
        <Link className="cart-link" to="/cart/">
          <MDBIcon className="cart-icon success-text" icon="shopping-cart" size="2x" />
          { (cart && cart.length > 0) &&
            <p className="cart-count">{cart.length}</p>
          }
        </Link>
      </div>
    </div>
  )
}

export default Navbar
