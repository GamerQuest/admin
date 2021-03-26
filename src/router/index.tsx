import NotFoundPage from 'components/pages/404page'
import MainLayout from 'layouts/main'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignInPage from 'router/pages/sign-in'
import SignUpPage from 'router/pages/sign-up'
import { ROUTE_PATHS } from 'router/routes'
import PrivateRoute from 'whoami/router/private-route'

function AppRouter() {
  return (
    <Switch>
      <Route path={ ROUTE_PATHS.SIGN_IN } component={ SignInPage } />
      <PrivateRoute path={ ROUTE_PATHS.LANDING } redirectTo={ ROUTE_PATHS.SIGN_IN }>
        <MainLayout>
          <Switch>
            <Route path={ ROUTE_PATHS.SIGN_UP } component={ SignUpPage } />
            <Route path="*" component={ NotFoundPage } />
          </Switch>
        </MainLayout>
      </PrivateRoute>
      <Route path="*" component={ NotFoundPage } />
    </Switch>
  )
}

export default AppRouter
