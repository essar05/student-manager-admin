import React, { useCallback } from 'react'

import HeaderSearch from './HeaderSearch'
import { useStore } from "../../shared/hooks/useStore"

type HeaderProps = {}

export const Header = (props: HeaderProps) => {
  const logout = useStore(state => state.logout)

  const handleLogout = useCallback(() => {
    localStorage.removeItem("auth-token")
    logout()
  }, [logout])

  const navSearchOpen = false

  return (
    <header className="topnavbar-wrapper">
      {/* START Top Navbar */}
      <nav className="navbar topnavbar">
        {/* START navbar header */}
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            <div className="brand-logo">Student Manager</div>
          </a>
        </div>

        {/*<ul className="navbar-nav mr-auto flex-row">*/}
        {/*    <li className="nav-item">*/}

        {/*        <a href="" className="nav-link d-none d-md-block d-lg-block d-xl-block" onClick={ this.toggleCollapsed }>*/}
        {/*            <em className="fas fa-bars"></em>*/}
        {/*        </a>*/}

        {/*        <a href=""  className="nav-link sidebar-toggle d-md-none" onClick={ this.toggleAside }>*/}
        {/*            <em className="fas fa-bars"></em>*/}
        {/*        </a>*/}
        {/*    </li>*/}
        {/*    <li className="nav-item d-none d-md-block">*/}
        {/*        <a  className="nav-link" onClick={ this.toggleUserblock }>*/}
        {/*            <em className="icon-user"></em>*/}
        {/*        </a>*/}
        {/*    </li>*/}

        {/*    <li className="nav-item d-none d-md-block">*/}
        {/*        <Link to="lock" title="Lock screen" className="nav-link">*/}
        {/*            <em className="icon-lock"></em>*/}
        {/*        </Link>*/}
        {/*    </li>*/}

        {/*</ul>*/}

        <ul className="navbar-nav flex-row">
          {/* Search icon */}
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </a>
          </li>

          {/*<li className="nav-item d-none d-md-block">*/}
          {/*    <ToggleFullscreen className="nav-link"/>*/}
          {/*</li>*/}

          {/*<UncontrolledDropdown nav inNavbar className="dropdown-list">*/}
          {/*    <DropdownToggle nav className="dropdown-toggle-nocaret">*/}
          {/*        <em className="icon-bell"></em>*/}
          {/*        <span className="badge badge-danger">11</span>*/}
          {/*    </DropdownToggle>*/}

          {/*    <DropdownMenu right className="dropdown-menu-right animated flipInX">*/}
          {/*        <DropdownItem>*/}

          {/*            <ListGroup>*/}
          {/*               <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>*/}
          {/*                  <div className="media">*/}
          {/*                     <div className="align-self-start mr-2">*/}
          {/*                        <em className="fab fa-twitter fa-2x text-info"></em>*/}
          {/*                     </div>*/}
          {/*                     <div className="media-body">*/}
          {/*                        <p className="m-0">New followers</p>*/}
          {/*                        <p className="m-0 text-muted text-sm">1 new follower</p>*/}
          {/*                     </div>*/}
          {/*                  </div>*/}
          {/*               </ListGroupItem>*/}
          {/*               <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>*/}
          {/*                  <div className="media">*/}
          {/*                     <div className="align-self-start mr-2">*/}
          {/*                        <em className="fa fa-envelope fa-2x text-warning"></em>*/}
          {/*                     </div>*/}
          {/*                     <div className="media-body">*/}
          {/*                        <p className="m-0">New e-mails</p>*/}
          {/*                        <p className="m-0 text-muted text-sm">You have 10 new emails</p>*/}
          {/*                     </div>*/}
          {/*                  </div>*/}
          {/*               </ListGroupItem>*/}
          {/*               <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>*/}
          {/*                  <div className="media">*/}
          {/*                     <div className="align-self-start mr-2">*/}
          {/*                        <em className="fa fa-tasks fa-2x text-success"></em>*/}
          {/*                     </div>*/}
          {/*                     <div className="media-body">*/}
          {/*                        <p className="m-0">Pending Tasks</p>*/}
          {/*                        <p className="m-0 text-muted text-sm">11 pending task</p>*/}
          {/*                     </div>*/}
          {/*                  </div>*/}
          {/*               </ListGroupItem>*/}
          {/*               <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>*/}
          {/*                  <span className="d-flex align-items-center">*/}
          {/*                     <span className="text-sm">More notifications</span>*/}
          {/*                     <span className="badge badge-danger ml-auto">14</span>*/}
          {/*                  </span>*/}
          {/*               </ListGroupItem>*/}
          {/*            </ListGroup>*/}

          {/*        </DropdownItem>*/}
          {/*    </DropdownMenu>*/}

          {/*</UncontrolledDropdown>*/}

          {/*<li className="nav-item">*/}
          {/*    <a className="nav-link" href="" onClick={this.toggleOffsidebar}>*/}
          {/*        <em className="icon-notebook"></em>*/}
          {/*    </a>*/}
          {/*</li>*/}
          {/* END Offsidebar menu */}
        </ul>
        {/* END Right Navbar */}

        {/* START Search form */}
        <HeaderSearch isOpen={false} onClose={() => {}} />
        {/* END Search form */}
      </nav>
      {/* END Top Navbar */}
    </header>
  )
}

export default Header
