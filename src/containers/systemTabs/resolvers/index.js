/**
 * Created by himanshu.s 23/10/2018
 */
import merge from 'lodash.merge'
import ppsConfigurationState from './ppsConfigurations'
import butlerFilterState from './butlerBots'
import chargingStationFilterState from './chargingStation'
import msuReconfigFilterState from './msuReconfig'
import ppsFilterState from '../pps/resolvers/ppsTab'
let pps_resolvers=merge(ppsConfigurationState,butlerFilterState,chargingStationFilterState,ppsFilterState,msuReconfigFilterState)
export default pps_resolvers

