import { ACTION_TYPES as WHOAMI_ACTION_TYPES } from 'whoami/duck/actions'
import storeDefault, {Store} from "./store";
import {ACTION_TYPES, ActionType} from "./actions";

function reducer(state: Store = storeDefault, action: ActionType): Store {
  switch (action.type) {
    case ACTION_TYPES.SET_DOCUMENT.FULFILLED: {
      return {
        ...state,
        list: [...state.list, action.payload?.game?.id!],
        items: {
          ...state.items,
          [action.payload?.game?.id!]: action.payload?.game!
        }
      }
    }
    case ACTION_TYPES.GET_FROM_LOGIN.FULFILLED:
    case ACTION_TYPES.GET_FROM_OBSERVATION.FULFILLED: {
      return {
        ...state,
        list: [...action.payload?.games?.map(game => game.id)!],
        items: {
          ...state.items,
          ...action.payload?.games?.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
        },
      }
    }
    case WHOAMI_ACTION_TYPES.SIGN_OUT.FULFILLED: {
      return { ...storeDefault }
    }
    default: {
      return {...state}
    }
  }
}

export default reducer
