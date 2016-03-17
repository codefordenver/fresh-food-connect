import * as reducers from 'reducers'
import ApiClient from 'persistence/ApiClient'
import createApiPromise from 'middleware/apiPromise'
import logger from 'middleware/logger'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const apiPromise = createApiPromise(new ApiClient())
const enhancer = applyMiddleware(thunk, logger, apiPromise)
const rootReducer = combineReducers(reducers)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
