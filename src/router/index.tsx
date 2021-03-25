import NotFoundPage from 'components/pages/404page'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignUpPage from 'router/pages/sign-up'
import { ROUTE_PATHS } from 'router/routes'

function AppRouter() {
  return (
    <Switch>
      <Route path={ ROUTE_PATHS.SIGN_UP } component={ SignUpPage } />
      <Route path="*" component={ NotFoundPage } />
    </Switch>
  )
}

export default AppRouter
