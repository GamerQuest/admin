import { buildAsyncAction } from 'core/store'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { Game } from './store'

export const ACTION_TYPES = {
  SET_DOCUMENT: buildAsyncAction('games_set_document'),
  UPLOAD_IMAGE: buildAsyncAction('games_upload_image'),
  UPDATE_DOCUMENT: buildAsyncAction('games_update_document'),
  GET_FROM_OBSERVATION: buildAsyncAction('games_get_from_observation'),
  GET_FROM_LOGIN: buildAsyncAction('games_get_from_login'),
}

export interface ActionType extends Action<string> {
  payload?: {
    game?: Game
    update?: {
      content: string,
      key: string,
      gameId: string,
    }[]
    err?: any
    games?: Game[]
  }
}

function useActions() {
  const dispatch = useDispatch<Dispatch<ActionType>>()

  return {
    create: (game: Game) => dispatch({ type: ACTION_TYPES.SET_DOCUMENT.FETCH, payload: { game } }),
    getFromObservation: (data: Game[] | undefined) => {
      console.log(data, !!data, data?.length)
      if (!!data && data.length) dispatch({
        type: ACTION_TYPES.GET_FROM_OBSERVATION.FULFILLED,
        payload: { games: data },
      })
    },
  }
}

export default useActions
