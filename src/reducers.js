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
import {histogramData} from './reducers/orderstatsReducer'
import {chargersDetail} from './reducers/chargersDetailReducer'
import {butlerDetail} from './reducers/butlerDetailReducer'
import {PPSDetail} from './reducers/ppsDetailReducer'
import {tabSelected} from './reducers/tabSelectReducer'
import {subTabSelected} from './reducers/subTabSelectReducer'
import {reducer as modalReducer} from 'react-redux-modal'


const rootReducer = combineReducers({
  intl:intlReducer,
  getData,
  authLogin,
  routing,
  recieveSocketActions,
  butlersInfo,
  chargerInfo,
  modals: modalReducer,
  auditInfo,
  putInfo,
  ppsInfo,
  throughputInfo,
  inventoryInfo,
  ordersInfo,
  performanceWidget,
  statsWidget,
  histogramData,
  chargersDetail,
  butlerDetail,
  PPSDetail,
  tabSelected,
  subTabSelected
   })

export default rootReducer