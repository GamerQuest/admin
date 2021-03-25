import { ACTION_TYPES, ActionType } from './actions'
import storeDefault, { Store } from './store'

function reducer(state = storeDefault, action: ActionType): Store {
  switch (action.type) {
    case ACTION_TYPES.SIGN_UP.FULFILLED: {
      return { ...state, authenticated: true }
    }
    case ACTION_TYPES.SET.FULFILLED: {
      return { ...state, iam: action.payload!.user! }
    }
    case ACTION_TYPES.SET.REJECTED:
    case ACTION_TYPES.SIGN_UP.REJECTED: {
      return { ...state, err: action.payload?.err! }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer
