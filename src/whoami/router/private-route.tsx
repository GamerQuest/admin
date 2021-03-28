import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import useFirebaseUserAuth from 'whoami/hooks/firebase'
import useSelectors from '../duck/selectors'

interface PrivateRouteProps extends RouteProps {
  redirectTo?: string
}

function PrivateRoute({ redirectTo = '/', ...props }: PrivateRouteProps) {
  useFirebaseUserAuth()
  const { authenticated } = useSelectors()
  if (!authenticated) return (<Redirect to={ redirectTo } />)
  return (<Route { ...props } />)
}

export default PrivateRoute
