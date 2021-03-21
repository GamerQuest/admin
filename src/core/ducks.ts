import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

export const reducers = combineReducers({})

export function* sagas() {
  yield all([])
}
