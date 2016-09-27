import { createStore, applyMiddleware } from 'redux';

import socketMiddleware from './middleware/socketMiddleware';
import ajaxMiddleware from './middleware/ajaxMiddleware';
import mockMiddleware from './middleware/mockMiddleware'
import rootReducer from './reducers';
//import {preloadedState} from './utilities/intialData';

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      ajaxMiddleware,
      socketMiddleware,
      mockMiddleware
    )
  )
}