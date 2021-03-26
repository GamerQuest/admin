import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import whoamiReducer from 'whoami/duck/reducer'
import whoamiSagas from 'whoami/duck/sagas'
import gamesReducer from 'games/duck/reducer'
import gamesSagas from 'games/duck/sagas'

export const reducers = combineReducers({
  whoami: whoamiReducer,
  games: gamesReducer,
})

export function* sagas() {
  yield all([
    whoamiSagas(),
    gamesSagas()
  ])
}
