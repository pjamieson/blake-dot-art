import React, { Component } from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"
import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
} from "mdbreact"

import logo from "../images/blake-logo-108x70.png"

class Navbar extends Component {
  state = {
    isOpen: false,
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <MDBNavbar color="faded" light fixed="top" expand="md">
        <MDBContainer>
          <MDBNavbarBrand>
            <Link to="/">
              <img src={logo} className="logo" alt="Logo"/>
              <strong>{this.props.siteTitle}</strong>
            </Link>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>

              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Pro Athlete Portraits</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/portraits-baseball/">Baseball</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/portraits-basketball/">Basketball</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/portraits-football/">Football</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/portraits-hockey/">Hockey</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/portraits-soccer/">Soccer</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/portraits-other-sports/">Other Sports</Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
                </MDBNavItem>

                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className="d-none d-md-inline">Gallery</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/gallery-athlete-portraits/">Athlete Portraits</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/gallery-other-portraits/">Other Portraits</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/gallery-felix/">Felix the Cat Series</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/gallery-abstracts/">Abstracts</Link>
                      </MDBDropdownItem>
                      <div class="dropdown-divider"></div>
                      <MDBDropdownItem>
                        <Link className="menu-link" to="/clients/">Clients & Collectors</Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">Merch</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/topps2020/">Topps Project 2020</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <a className="menu-link" href="https://blakespuzzles.com" target="_blank" rel="noopener noreferrer">Jigsaw Puzzles</a>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/fannie-packs/">Fannie Packs</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link className="menu-link" to="/card-art/">Card Art</Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Contact</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/ask-a-question/">Ask a Question</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/make-a-comment/">Make a Comment</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/start-a-project/">Start a Project</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/mailing-list-signup/">Mailing List Signup</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link className="menu-link" to="/autograph-request/">Autograph Request</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem>
                <Link to="/press/" className="nav-link" activeClassName="active">
                  Press
                </Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link to="/team/" className="nav-link" activeClassName="active">
                  #TeamBlake
                </Link>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <a href="https://www.youtube.com/user/BlakeJamieson" target="_blank" rel="noreferrer" class="nav-link waves-effect waves-light">
                  <i class="fab fa-youtube fa-lg" aria-hidden="true"></i>
                </a>
              </MDBNavItem>
              <MDBNavItem>
                <a href="https://www.instagram.com/athlete.portraits/" target="_blank" rel="noreferrer" class="nav-link waves-effect waves-light">
                  <i class="fab fa-instagram fa-lg" aria-hidden="true"></i>
                </a>
              </MDBNavItem>
              <MDBNavItem>
                <a href="https://twitter.com/blakejamieson" target="_blank" rel="noreferrer" class="nav-link waves-effect waves-light">
                  <i class="fab fa-twitter fa-lg" aria-hidden="true"></i>
                </a>
              </MDBNavItem>
              <MDBNavItem>
                <a href="https://www.linkedin.com/in/blakejamieson/" target="_blank" rel="noreferrer" class="nav-link waves-effect waves-light">
                  <i class="fab fa-linkedin fa-lg" aria-hidden="true"></i>
                </a>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    )
  }
}
Navbar.propTypes = {
  siteTitle: PropTypes.string,
}

Navbar.defaultProps = {
  siteTitle: ``,
}

export default Navbar
