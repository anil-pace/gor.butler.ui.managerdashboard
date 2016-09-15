import { combineReducers } from 'redux';
import {getData}  from './reducers/headerReducer'
import {authLogin}  from './reducers/loginReducer'
import {recieveSocketActions}  from './reducers/socketReducer'
import { routerReducer as routing } from 'react-router-redux';
import {intlReducer} from 'react-intl-redux'
import {performanceWidget}  from './reducers/performanceWidgetReducer'
import {butlersInfo}  from './reducers/butlerReducer'
import {chargerInfo}  from './reducers/chargerReducer'
import {pickInfo}  from './reducers/pickReducer'
import {ppsInfo}  from './reducers/ppsReducer'
import {putInfo}  from './reducers/putReducer'
import {inventoryInfo}  from './reducers/inventoryReducer'
import {ordersInfo}  from './reducers/ordersReducer'
import {statsWidget} from './reducers/statsWidgetReducer'

const rootReducer = combineReducers({
  intl:intlReducer,
  getData,
  authLogin,
  routing,
  recieveSocketActions,
  butlersInfo,
  chargerInfo,
  pickInfo,
  putInfo,
  ppsInfo,
  inventoryInfo,
  ordersInfo,
  performanceWidget,
  statsWidget })

export default rootReducer