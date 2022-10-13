import React, { Suspense, lazy, useEffect } from 'react'
import { withRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader'

import Base from './components/Layout/Base'
import BasePage from './components/Layout/BasePage'
import { useStore } from './shared/hooks/useStore'

/* Used to render a lazy component with react-router */
const waitFor = (Tag: React.LazyExoticComponent<any>) => (props: any) => <Tag {...props} />

const ClassList = lazy(() => import('./screens/ClassList/ClassList').then(module => ({ default: module.ClassList })))
const Class = lazy(() => import('./screens/Class/Class').then(module => ({ default: module.Class })))
const Login = lazy(() => import('./screens/Login/Login').then(module => ({ default: module.Login })))

// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages: Array<string> = [
  /* See full project for reference */
  '/login',
]

const Routes = ({ location }: RouteProps) => {
  const isAuthenticated = useStore(state => state.isAuthenticated)
  const updateToken = useStore(state => state.updateToken)
  const logout = useStore(state => state.logout)

  const currentKey = location!.pathname.split('/')[1] || '/'
  const timeout = { enter: 500, exit: 500 }

  // Animations supported
  //      'rag-fadeIn'
  //      'rag-fadeInRight'
  //      'rag-fadeInLeft'

  const animationName = 'rag-fadeIn'

  useEffect(() => {
    if (isAuthenticated === undefined) {
      const authToken = localStorage.getItem('auth-token')

      if (authToken) {
        updateToken(authToken)
      } else {
        logout()
      }
    }
  }, [updateToken, isAuthenticated, logout])

  if (isAuthenticated === undefined) {
    return null
  }

  if (listofPages.indexOf(location!.pathname) > -1) {
    return (
      // Page Layout component wrapper
      <BasePage>
        <Suspense fallback={<PageLoader />}>
          <Switch location={location}>
            {isAuthenticated && <Redirect to={'/classes'} />}

            <Route path="/login" component={waitFor(Login)} />
          </Switch>
        </Suspense>
      </BasePage>
    )
  } else {
    return (
      <Base>
        <TransitionGroup>
          <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
            <div>
              <Suspense fallback={<PageLoader />}>
                <Switch location={location}>
                  {!isAuthenticated && <Redirect to={'/login'} />}

                  <Route path="/classes/:id" component={waitFor(Class)} />
                  <Route path="/classes" component={waitFor(ClassList)} />

                  <Redirect to="/classes" />
                </Switch>
              </Suspense>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Base>
    )
  }
}

export default withRouter(Routes)
