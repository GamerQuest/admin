import { Dispatch, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useUser } from 'reactfire'
import { ACTION_TYPES, ActionType } from 'whoami/duck/actions'
import useSelectors from 'whoami/duck/selectors'

function useFirebaseUserAuth() {
  const { data: userData } = useUser()
  const dispatch = useDispatch<Dispatch<ActionType>>()
  const { authenticated } = useSelectors()

  useEffect(() => {
    if ((!!userData && userData.uid) && !authenticated) {
      dispatch({ type: ACTION_TYPES.GET.FETCH, payload: { id: userData.uid } })
    }
  }, [authenticated, dispatch, userData])

}

export default useFirebaseUserAuth
