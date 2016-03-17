import * as reducers from 'reducers'
import ApiClient from 'persistence/ApiClient'
import DevTools from 'components/DevTools'
import createApiPromise from 'middleware/apiPromise'
import logger from 'middleware/logger'
import thunk from 'redux-thunk'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'

const apiPromise = createApiPromise(new ApiClient())
const rootReducer = combineReducers(reducers)
const enhancer = compose(
  applyMiddleware(thunk, logger, apiPromise),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  return (matches && matches.length > 0)? matches[1] : null
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers'))
    })
  }

  return store
}
