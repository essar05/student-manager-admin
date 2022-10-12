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

const Welcome = lazy(() => import('./components/Welcome/Welcome'))
const Spinners = lazy(() => import('./componentsJS/Elements/Spinner'))
const Buttons = lazy(() => import('./components/Elements/Buttons'))
const Cards = lazy(() => import('./components/Elements/Cards'))
const TableStandard = lazy(() => import('./components/Tables/TableStandard'))
const FormStandard = lazy(() => import('./components/Forms/FormStandard'))
const Forum = lazy(() => import('./componentsJS/Forum/ForumHome'))
const Blog = lazy(() => import('./componentsJS/Blog/BlogList'))
const Charts = lazy(() => import('./componentsJS/Charts/ChartChartJS'))
const Dashboard = lazy(() => import('./componentsJS/Dashboard/DashboardV3'))
const DataGrid = lazy(() => import('./componentsJS/Tables/DataGrid'))
const Datatable = lazy(() => import('./componentsJS/Tables/Datatable'))
const Datatableview = lazy(() => import('./componentsJS/Tables/DatatableView'))
const contacts = lazy(() => import('./componentsJS/Extras/Contacts'))
const faq = lazy(() => import('./componentsJS/Extras/Faq'))
const filemanager = lazy(() => import('./componentsJS/Extras/FileManager'))
const followers = lazy(() => import('./componentsJS/Extras/Followers'))
const helpcenter = lazy(() => import('./componentsJS/Extras/HelpCenter'))
const plans = lazy(() => import('./componentsJS/Extras/Plans'))
const profile = lazy(() => import('./componentsJS/Extras/Profile'))
const projects = lazy(() => import('./componentsJS/Extras/Projects'))
const projectdetails = lazy(() => import('./componentsJS/Extras/ProjectDetails'))
const search = lazy(() => import('./componentsJS/Extras/Search'))
const settings = lazy(() => import('./componentsJS/Extras/Settings'))
const teamviewer = lazy(() => import('./componentsJS/Extras/TeamViewer'))
const votelinks = lazy(() => import('./componentsJS/Extras/VoteLinks'))
const formcropper = lazy(() => import('./componentsJS/Forms/FormCropper'))
const formupload = lazy(() => import('./componentsJS/Forms/FormUpload'))
const formvalidation = lazy(() => import('./componentsJS/Forms/FormValidation'))
const formwizard = lazy(() => import('./componentsJS/Forms/FormWizard'))
const formwizardvertical = lazy(() => import('./componentsJS/Forms/FormWizard.Vertical'))

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
      // Layout component wrapper
      // Use <BaseHorizontal> to change layout
      <Base>
        <TransitionGroup>
          <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
            <div>
              <Suspense fallback={<PageLoader />}>
                <Switch location={location}>
                  {!isAuthenticated && <Redirect to={'/login'} />}

                  <Route path="/classes/:id" component={waitFor(Class)} />
                  <Route path="/classes" component={waitFor(ClassList)} />

                  <Route path="/welcome" component={waitFor(Welcome)} />
                  <Route path="/spinners" component={waitFor(Spinners)} />
                  <Route path="/buttons" component={waitFor(Buttons)} />
                  <Route path="/cards" component={waitFor(Cards)} />
                  <Route path="/table-standard" component={waitFor(TableStandard)} />
                  <Route path="/form-standard" component={waitFor(FormStandard)} />
                  <Route path="/forum" component={waitFor(Forum)} />
                  <Route path="/blog" component={waitFor(Blog)} />
                  <Route path="/charts" component={waitFor(Charts)} />
                  <Route path="/dashboard" component={waitFor(Dashboard)} />

                  <Route path="/datagrid" component={waitFor(DataGrid)} />
                  <Route path="/datatable" component={waitFor(Datatable)} />
                  <Route path="/datatableview" component={waitFor(Datatableview)} />
                  <Route path="/contacts" component={waitFor(contacts)} />
                  <Route path="/faq" component={waitFor(faq)} />
                  <Route path="/filemanager" component={waitFor(filemanager)} />
                  <Route path="/followers" component={waitFor(followers)} />
                  <Route path="/helpcenter" component={waitFor(helpcenter)} />
                  <Route path="/plans" component={waitFor(plans)} />
                  <Route path="/profile" component={waitFor(profile)} />
                  <Route path="/projects" component={waitFor(projects)} />
                  <Route path="/projectdetails" component={waitFor(projectdetails)} />
                  <Route path="/search" component={waitFor(search)} />
                  <Route path="/settings" component={waitFor(settings)} />
                  <Route path="/teamviewer" component={waitFor(teamviewer)} />
                  <Route path="/votelinks" component={waitFor(votelinks)} />

                  <Route path="/formcropper" component={waitFor(formcropper)} />
                  <Route path="/formupload" component={waitFor(formupload)} />
                  <Route path="/formvalidation" component={waitFor(formvalidation)} />
                  <Route path="/formwizard" component={waitFor(formwizard)} />
                  <Route path="/formwizardvertical" component={waitFor(formwizardvertical)} />

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
