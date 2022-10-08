import React, { Component } from 'react'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

export interface OffsidebarProps {
}


class Offsidebar extends Component<OffsidebarProps> {

  state = {
    activeTab: 'settings',
    offsidebarReady: false
  }

  componentDidMount() {
    // When mounted display the offsidebar
    this.setState({ offsidebarReady: true })
  }

  toggle = (tab: string) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  handleSettingCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
  }

  handleThemeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
  }

  render() {
    return null
  }

}

export default Offsidebar
