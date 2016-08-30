import { combineReducers } from 'redux';
import {getData}  from './reducers/headerReducer'
import {authLogin}  from './reducers/loginReducer'



const rootReducer = combineReducers({
  getData,authLogin
})

export default rootReducer