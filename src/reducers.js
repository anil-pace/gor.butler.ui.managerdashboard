import { combineReducers } from 'redux';
import {getData}  from './reducers/headerReducer'
import {authLogin}  from './reducers/loginReducer'
import { syncHistoryWithStore,routerReducer as routing } from 'react-router-redux';




const rootReducer = combineReducers({
  getData,authLogin,routing
})

export default rootReducer