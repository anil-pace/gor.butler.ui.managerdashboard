import { createStore, applyMiddleware } from 'redux';

import socketMiddleware from './middleware/socketMiddleware';
import ajaxMiddleware from './middleware/ajaxMiddleware';
import mockMiddleware from './middleware/mockMiddleware';
import notificationSocketMiddleware from './middleware/notificationSocketMiddleware'
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      ajaxMiddleware,
      socketMiddleware,
      notificationSocketMiddleware,
      mockMiddleware
    )
  )
}