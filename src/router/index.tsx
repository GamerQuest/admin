import NotFoundPage from 'components/pages/404page'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

function AppRouter() {
  return (
    <Switch>
      <Route path="*" component={ NotFoundPage } />
    </Switch>
  )
}

export default AppRouter
