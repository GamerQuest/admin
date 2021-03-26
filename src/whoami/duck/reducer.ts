import { ACTION_TYPES, ActionType } from './actions'
import storeDefault, { Store } from './store'

function reducer(state = storeDefault, action: ActionType): Store {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN.FULFILLED:
    case ACTION_TYPES.SIGN_UP.FULFILLED: {
      return { ...state, authenticated: true }
    }
    case ACTION_TYPES.GET.FULFILLED:
    case ACTION_TYPES.SET.FULFILLED: {
      return { ...state, iam: action.payload!.user! }
    }
    case ACTION_TYPES.SIGN_OUT.FULFILLED: {
      return { ...storeDefault }
    }
    case ACTION_TYPES.SIGN_OUT.REJECTED:
    case ACTION_TYPES.SIGN_IN.REJECTED:
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
