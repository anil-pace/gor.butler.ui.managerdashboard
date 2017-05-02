import { combineReducers } from 'redux';
import {headerData}  from './reducers/headerReducer'
import {authLogin}  from './reducers/loginReducer'
import {spinner}  from './reducers/spinnerReducer'
import {recieveSocketActions}  from './reducers/socketReducer'
import { routerReducer as routing } from 'react-router-redux';
import { intlReducer } from 'react-intl-redux';
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
import {reducer as modalReducer} from 'react-redux-modal'
import {PPSperformance} from './reducers/ppsPerformanceReducer'
import {userDetails} from './reducers/userDetailReducer';
import {getOrderDetail} from './reducers/orderDetailReducer';
import {appInfo} from './reducers/infoReducer';
import {filterOptions} from './reducers/orderFilterReducer'
import {waveInfo} from './reducers/waveDetailReducer';
import {d3barChart} from './reducers/barChartReducer';
import {currentTableState} from './reducers/tableStateReducer';
import {recieveAuditDetail} from './reducers/auditDetailReducer';
import {tabsData} from './reducers/tabDataReducer';
import {sortHeaderState} from './reducers/sortHeaderReducer';
import {filterInfo} from './reducers/filterReducer';
import {emergency} from './reducers/emergencyReducer';
import {overviewDetails} from './reducers/overviewReducer';

const rootReducer = combineReducers({
  intl:intlReducer,
  headerData,
  authLogin,
  routing,
  recieveSocketActions,
  butlersInfo,
  chargerInfo,
  modals: modalReducer,
  appInfo,
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
  tabsData,
  tabSelected,
  PPSperformance,
  userDetails,
  spinner,
  getOrderDetail,
  filterOptions,
  waveInfo,
  d3barChart,
  currentTableState,
  recieveAuditDetail,
  sortHeaderState,
  filterInfo,
  emergency,
    overviewDetails
   })

export default rootReducer