import React, { Component } from 'react'

import HeaderHorizontal from './HeaderHorizontal'
import Offsidebar from './Offsidebar'
import Footer from './Footer'

export interface BaseHorizontalProps {
}

class BaseHorizontal extends Component<BaseHorizontalProps> {
  /* Toggle Horizontal layout for demo purposes.
      Set the 'horizontal' flag using redux in the settingsReducer
      and remove below methods so it gets rendered by default
  */
  componentDidMount = () => {
  }
  componentWillUnmount = () => {
  }

  render() {

    return (
      <div className="wrapper">
        <HeaderHorizontal/>

        <Offsidebar/>

        <section className="section-container">
          {this.props.children}
        </section>

        <Footer/>
      </div>
    )
  }

}

export default BaseHorizontal
