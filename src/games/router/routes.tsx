import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import NotFoundPage from 'components/pages/404page'
import LandingPage from './landing'

export const ROUTE_PATHS = {
  BASE: '/games',
  LANDING: '/',
}

function GamesRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={ path + ROUTE_PATHS.LANDING } component={ LandingPage } />
      <Route path="*" component={ NotFoundPage } />
    </Switch>
  )
}

export default GamesRoutes
