import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import socketMiddleware from './middleware/socketMiddleware'
import {routerMiddleware,push} from 'react-router-redux'
import { browserHistory } from 'react-router';

import rootReducer from './reducers'

const routeMWare = routerMiddleware(browserHistory);

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      socketMiddleware,
      routeMWare

    )
  )
}