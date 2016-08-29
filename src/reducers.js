import { combineReducers } from 'redux';
import getData  from './reducers/headerReducer'
import getDummyData  from './reducers/dummyReducer'


const rootReducer = combineReducers({
  getData,
  getDummyData
})

export default rootReducer