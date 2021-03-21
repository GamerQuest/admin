import React, { PropsWithChildren, useEffect } from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { uid } from 'uid'

interface StoreFilters {
  selected: string[]
  sortBy: string[]
}

export interface StoreDefault<S> {
  list: string[]
  items: { [id: string]: S }
  filters: StoreFilters
  err: any
}

export interface DocumentMeta<F = Date> {
  id: string
  meta: {
    createdAt: F
    updatedAt: F
    deleted: boolean
  }
}

export const buildDocumentMeta = (idLength: number = 28): DocumentMeta => ({
  id: uid(idLength),
  meta: {
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
})

interface StoreProviderProps {
  reducers: Reducer
  sagas: () => Generator
}

export function buildAsyncAction(actionName: string) {
  return {
    FETCH: `${ actionName.toUpperCase() }_FETCH`,
    PENDING: `${ actionName.toUpperCase() }_PENDING`,
    FULFILLED: `${ actionName.toUpperCase() }_FULFILLED`,
    REJECTED: `${ actionName.toUpperCase() }_REJECTED`,
  }
}

function StoreProvider({ children, reducers, sagas }: PropsWithChildren<StoreProviderProps>) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewareList = [sagaMiddleware]

  useEffect(() => {
    sagaMiddleware.run(function* () {
      yield all([sagas()])
    })
  }, [sagaMiddleware, sagas])

  let middlewares = applyMiddleware(...middlewareList)

  if (process.env.NODE_ENV === 'development') {
    middlewares = composeWithDevTools(applyMiddleware(...middlewareList))
  }

  const store = createStore(reducers, middlewares)
  return (<Provider store={ store }>{ children }</Provider>)
}

export default StoreProvider
