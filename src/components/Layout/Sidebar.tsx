import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Collapse, Badge } from 'reactstrap'

import SidebarRun from './Sidebar.run'
import SidebarUserBlock from './SidebarUserBlock'

import Menu, { ISidebarMenuItem } from '../../Menu'

export interface SidebarItemHeaderProps {
  item: ISidebarMenuItem
}

/** Component to display headings on sidebar */
const SidebarItemHeader = ({ item }: SidebarItemHeaderProps) => (
  <li className="nav-heading">
    <span>{item.heading}</span>
  </li>
)

export interface SidebarItemProps {
  item: ISidebarMenuItem
  isActive: boolean
}

/** Normal items for the sidebar */
const SidebarItem = ({ item, isActive }: SidebarItemProps) => (
  <li className={isActive ? 'active' : ''}>
    <Link to={item.path!} title={item.name}>
      {item.label && (
        <Badge tag="div" className="float-right" color={item.label.color}>
          {item.label.value}
        </Badge>
      )}
      {item.icon && <em className={item.icon}></em>}
      <span>
        {item.name}
      </span>
    </Link>
  </li>
)

export interface SidebarSubItemProps {
  item: ISidebarMenuItem
  isActive: boolean
  handler: (e: React.MouseEvent) => void
  children: React.ReactNode
  isOpen: boolean
}

/** Build a sub menu with items inside and attach collapse behavior */
const SidebarSubItem = ({ item, isActive, handler, children, isOpen }: SidebarSubItemProps) => (
  <li className={isActive ? 'active' : ''}>
    <div className="nav-item" onClick={handler}>
      {item.label && (
        <Badge tag="div" className="float-right" color={item.label.color}>
          {item.label.value}
        </Badge>
      )}
      {item.icon && <em className={item.icon}></em>}
      <span>{item.name}</span>
    </div>
    <Collapse isOpen={isOpen}>
      <ul id={item.path} className="sidebar-nav sidebar-subnav">
        {children}
      </ul>
    </Collapse>
  </li>
)

export interface SidebarSubHeaderProps {
  item: ISidebarMenuItem
}

/** Component used to display a header on menu when using collapsed/hover mode */
const SidebarSubHeader = ({ item }: SidebarSubHeaderProps) => <li className="sidebar-subnav-header">{item.name}</li>

interface StringBoolArray {
  [index: string]: boolean
}

export interface SidebarProps extends RouteComponentProps {}

class Sidebar extends Component<SidebarProps> {
  state = {
    collapse: {} as StringBoolArray,
  }

  componentDidMount() {
    // pass navigator to access router api
    SidebarRun(this.navigator, this.closeSidebar)
    // prepare the flags to handle menu collapsed states
    this.buildCollapseList()

    // Listen for routes changes in order to hide the sidebar on mobile
    this.props.history.listen(this.closeSidebar)
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      this.buildCollapseList()
    }
  }

  closeSidebar = () => {}

  /** prepare initial state of collapse menus. Doesnt allow same route names */
  buildCollapseList = () => {
    const collapse = {} as StringBoolArray
    Menu.filter(({ heading }) => !heading).forEach(({ name, path, submenu }) => {
      if (name) collapse[name] = this.routeActive(submenu ? submenu.map(({ path }) => path) : path)
    })
    this.setState({ collapse })
  }

  navigator = (route: string) => {
    this.props.history.push(route.replace('#', '')) // remove '#' in case of use HashRouter
  }

  routeActive(paths: string | Array<string | undefined> | undefined) {
    paths = Array.isArray(paths) ? paths : [paths]
    return paths.some(p => {
      return p && this.props.location.pathname.indexOf(p) > -1
    })
  }

  toggleItemCollapse(stateName: string) {
    const { collapse } = this.state
    for (const c in collapse) {
      if (collapse[c] === true && c !== stateName)
        this.setState({
          collapse: {
            [c]: false,
          },
        })
    }
    this.setState({
      collapse: {
        [stateName]: !collapse[stateName],
      },
    })
  }

  getSubRoutes = (item: ISidebarMenuItem): Array<string | undefined> => {
    return item.submenu ? item.submenu.map(({ path }) => path) : []
  }

  /** map menu config to string to determine which element to render */
  itemType = (item: ISidebarMenuItem) => {
    if (item.heading) return 'heading'
    if (!item.submenu) return 'menu'
    if (item.submenu) return 'submenu'
  }

  render() {
    return (
      <aside className="aside-container">
        {/* START Sidebar (left) */}
        <div className="aside-inner">
          <nav data-sidebar-anyclick-close="" className="sidebar">
            {/* START sidebar nav */}
            <ul className="sidebar-nav">
              {/* START user info */}
              <li className="has-user-block">
                <SidebarUserBlock />
              </li>
              {/* END user info */}

              {/* Iterates over all sidebar items */}
              {Menu.filter(i => i.visible || i.visible === undefined).map((item, i) => {
                // heading
                if (this.itemType(item) === 'heading') return <SidebarItemHeader item={item} key={i} />
                else {
                  if (this.itemType(item) === 'menu')
                    return <SidebarItem isActive={this.routeActive(item.path)} item={item} key={i} />
                  if (this.itemType(item) === 'submenu')
                    return (
                      item.name && [
                        <SidebarSubItem
                          item={item}
                          isOpen={this.state.collapse[item.name]}
                          handler={this.toggleItemCollapse.bind(this, item.name)}
                          isActive={this.routeActive(this.getSubRoutes(item))}
                          key={i}
                        >
                          <SidebarSubHeader item={item} key={i} />
                          {item.submenu &&
                            item.submenu.map((subitem, i) => (
                              <SidebarItem key={i} item={subitem} isActive={this.routeActive(subitem.path)} />
                            ))}
                        </SidebarSubItem>,
                      ]
                    )
                }
                return null // unrecognized item
              })}
            </ul>
            {/* END sidebar nav */}
          </nav>
        </div>
        {/* END Sidebar (left) */}
      </aside>
    )
  }
}

export default withRouter(Sidebar)
