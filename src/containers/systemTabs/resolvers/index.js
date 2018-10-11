/**
 * Created by gaurav.m on 2/28/18.
 */
import merge from 'lodash.merge'
import ppsConfigurationState from './ppsConfigurations'
import butlerFilterState from './butlerBots'
import chargingStationFilterState from './chargingStation'
import msuConfigFilterState from './msuList';
let pps_resolvers=merge(ppsConfigurationState,butlerFilterState,chargingStationFilterState,msuConfigFilterState)
export default pps_resolvers