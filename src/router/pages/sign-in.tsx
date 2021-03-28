import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTE_PATHS } from 'router/routes'
import useSelectors from 'whoami/duck/selectors'
import SignInForm from 'whoami/forms/sign-in'
import useFirebaseUserAuth from 'whoami/hooks/firebase'

function SignInPage() {
  useFirebaseUserAuth()
  const { authenticated } = useSelectors()
  const history = useHistory()

  useEffect(() => {
    if (authenticated) history.push(ROUTE_PATHS.LANDING)
  }, [authenticated, history])

  return (
    <div>
      <SignInForm />
    </div>
  )
}

export default SignInPage
