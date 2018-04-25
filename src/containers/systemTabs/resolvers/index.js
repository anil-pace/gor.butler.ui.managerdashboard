/**
 * Created by gaurav.m on 2/28/18.
 */
import merge from 'lodash.merge'
import ppsConfigurationState from './ppsConfigurations'
import butlerFilterState from './butlerBots'
let pps_resolvers=merge(ppsConfigurationState,butlerFilterState)
export default pps_resolvers