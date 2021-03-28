import NotFoundPage from 'components/pages/404page'
import GamesRoutes, { ROUTE_PATHS as GAMES_ROUTES } from 'games/router/routes'
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
      <Route path={ ROUTE_PATHS.SIGN_UP } component={ SignUpPage } />
      <PrivateRoute path={ ROUTE_PATHS.LANDING } redirectTo={ ROUTE_PATHS.SIGN_IN }>
        <MainLayout>
          <Switch>
            <Route path={ GAMES_ROUTES.BASE } component={ GamesRoutes } />
            <Route path="*" component={ NotFoundPage } />
          </Switch>
        </MainLayout>
      </PrivateRoute>
      <Route path="*" component={ NotFoundPage } />
    </Switch>
  )
}

export default AppRouter
