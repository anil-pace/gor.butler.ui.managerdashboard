/**
 * Created by gaurav.m on 2/28/18.
 */
import user_resolvers from './../../containers/userTab/resolvers'
import pps_resolvers from './../../containers/systemTabs/resolvers'
import reports_resolvers from './../../containers/reportsTab/resolvers'
import audit_resolvers from './../../containers/auditTab/resolvers'

import merge from 'lodash.merge'
const resolvers = merge(user_resolvers, pps_resolvers, reports_resolvers, audit_resolvers)
export default resolvers

