import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router';
import rootReducer from './reducers'


export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
    )
  )
}