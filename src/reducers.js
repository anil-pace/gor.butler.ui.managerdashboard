import { combineReducers } from 'redux';
import {getData}  from './reducers/headerReducer'



const rootReducer = combineReducers({
  getData
})

export default rootReducer