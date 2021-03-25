import { buildAsyncAction } from 'core/store'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { Iam } from 'whoami/duck/store'

export const ACTION_TYPES = {
  SIGN_UP: buildAsyncAction('whoami_sign_up'),
  SET: buildAsyncAction('whoami_set'),
}

export interface ActionType extends Action<string> {
  payload?: {
    user?: Iam,
    password?: string,
    err?: string,
  }
}

function useActions() {
  const dispatch = useDispatch<Dispatch<ActionType>>()
  const signUp = (user: Iam, password: string) => dispatch({
    type: ACTION_TYPES.SIGN_UP.FETCH,
    payload: { user, password },
  })
  return { signUp }
}

export default useActions
