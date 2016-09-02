import { createStore, applyMiddleware } from 'redux'

import socketMiddleware from './middleware/socketMiddleware'
import ajaxMiddleware from './middleware/ajaxMiddleware'
import rootReducer from './reducers'


export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      ajaxMiddleware,
      socketMiddleware

    )
  )
}