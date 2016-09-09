import { combineReducers } from 'redux';
import {getData}  from './reducers/headerReducer'
import {authLogin}  from './reducers/loginReducer'
import {recieveSocketActions}  from './reducers/socketReducer'
import { routerReducer as routing } from 'react-router-redux';
import {intlReducer} from 'react-intl-redux'
import {performanceWidget}  from './reducers/performanceWidgetReducer'

const rootReducer = combineReducers({
  intl:intlReducer,getData,authLogin,routing,recieveSocketActions,performanceWidget

export default rootReducer