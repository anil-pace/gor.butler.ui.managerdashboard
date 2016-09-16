import { combineReducers } from 'redux';
import {getData}  from './reducers/headerReducer'
import {authLogin}  from './reducers/loginReducer'
import {recieveSocketActions}  from './reducers/socketReducer'
import { routerReducer as routing } from 'react-router-redux';
import {intlReducer} from 'react-intl-redux'
import {performanceWidget}  from './reducers/performanceWidgetReducer'
import {butlersInfo}  from './reducers/butlerReducer'
import {chargerInfo}  from './reducers/chargerReducer'
import {auditInfo}  from './reducers/auditReducer'
import {ppsInfo}  from './reducers/ppsReducer'
import {putInfo}  from './reducers/putReducer'
import {inventoryInfo}  from './reducers/inventoryReducer'
import {ordersInfo}  from './reducers/ordersReducer'
import {throughputInfo}  from './reducers/throughputReducer'
import {statsWidget} from './reducers/statsWidgetReducer'


const rootReducer = combineReducers({
  intl:intlReducer,
  getData,
  authLogin,
  routing,
  recieveSocketActions,
  butlersInfo,
  chargerInfo,
  auditInfo,
  putInfo,
  ppsInfo,
  throughputInfo,
  inventoryInfo,
  ordersInfo,
  performanceWidget,
  statsWidget })

export default rootReducer