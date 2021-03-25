import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import whoamiReducer from 'whoami/duck/reducer'
import whoamiSagas from 'whoami/duck/sagas'

export const reducers = combineReducers({
  whoami: whoamiReducer,
})

export function* sagas() {
  yield all([
    whoamiSagas(),
  ])
}
