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

import logo from "../images/blake-logo-108x70-amber.png"

const Navbar = () => {
  const { cart } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
      <div className="container">

        <MDBNavbarBrand>
          <Link to="/" className="navbar-brand">
            <img src={logo} className="logo" alt="Logo"/>
            <span className="brand-name blake">BLAKE</span>
            <span className="brand-name dot">.</span>
            <span className="brand-name art">ART</span>
          </Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <SocialLinks />
            </MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav className="menu-options" right>

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav>
                  <div className="nav-menu-item">
                    <p>PORTFOLIO</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
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
                    <Link className="menu-link" to="/portfolio/b206/">B206</Link>
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
                  <p>GALLERY</p>
                  <p className="menu-sub">(For Sale)</p>
                </div>
              </MDBDropdownToggle>
                <MDBDropdownMenu>
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
                    <Link className="menu-link" to="/gallery/b206/">B206</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/collabs/">Collabs</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/gallery/mystery-boxes/">Mystery Boxes</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

            <MDBNavItem>
              {/*<Link className="nav-link" to="/topps/project2020/">
                <div className="nav-menu-item">
                  <p>TOPPS</p>
                  <p className="menu-sub">Project 2020</p>
                </div>
              </Link>*/}
              <MDBDropdown>
                <MDBDropdownToggle nav>
                  <div className="nav-menu-item">
                    <p>TOPPS</p>
                    <p className="menu-sub">Cards & Autos</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project70/">Project 70</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/1951/">1951</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project2020/">Project 2020</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav>
                  <div className="nav-menu-item">
                    <p>MERCH</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
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
                <MDBDropdownToggle nav>
                  <div className="nav-menu-item">
                    <p>ABOUT</p>
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/team/">#TeamBlake</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/press/">Press</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/about/contact/">Contact</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/subscribe/">Mailing List</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

            <MDBNavItem>
              <MDBDropdown>

                <MDBDropdownToggle nav>
                  <div className="hidden-nav-item nav-menu-item">
                    <p>.</p>
                  </div>
                </MDBDropdownToggle>

                <MDBDropdownMenu>
                <MDBDropdownItem>
                  <Link className="menu-link" to="/topps/project70/kris-bryant/">Kris Bryant</Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link className="menu-link" to="/topps/project70/brett-phillips/">Brett Phillips</Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link className="menu-link" to="/topps/project70/2021-all-star-game/">2021 All Star Game</Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link className="menu-link" to="/topps/project70/brooks-robinson/">Brooks Robinson</Link>
                </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project70/randy-arozarena/">Randy Arozarena</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project70/jarred-kelenic/">Jarred Kelenic</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project70/rickey-henderson/">Rickey Henderson</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project70/buster-posey/">Buster Posey</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project70/ronald-acuna-jr/">Ronald Acuña Jr</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/topps/project70/andrew-mccutchen/">Andrew McCutchen</Link>
                  </MDBDropdownItem>
                  {/*<MDBDropdownItem>
                    <Link className="menu-link" to="/product/autograph/">Autos by Mail</Link>
                  </MDBDropdownItem>*/}
                </MDBDropdownMenu>
              </MDBDropdown>
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
