import { buildAsyncAction } from 'core/store'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { Iam } from 'whoami/duck/store'

export const ACTION_TYPES = {
  SIGN_UP: buildAsyncAction('whoami_sign_up'),
  SET: buildAsyncAction('whoami_set'),
  SIGN_IN: buildAsyncAction('whoami_sign_in'),
  GET: buildAsyncAction('whoami_get'),
  SIGN_OUT: buildAsyncAction('whoami_sign_out'),
}

export interface ActionType extends Action<string> {
  payload?: {
    user?: Iam
    password?: string
    err?: string
    email?: string
    id?: string
  }
}

function useActions() {
  const dispatch = useDispatch<Dispatch<ActionType>>()
  const signUp = (user: Iam, password: string) => dispatch({
    type: ACTION_TYPES.SIGN_UP.FETCH,
    payload: { user, password },
  })

  const signIn = (email: string, password: string) => dispatch({
    type: ACTION_TYPES.SIGN_IN.FETCH,
    payload: { email, password },
  })

  const signOut = () => dispatch({ type: ACTION_TYPES.SIGN_OUT.FETCH })

  return { signUp, signIn, signOut }
}

export default useActions
