/**
 * Created by gaurav.m on 2/28/18.
 */
import merge from 'lodash.merge'
//import todos from './todo'
import auditFilterState from './filter'
import auditInternalState from './InternalState';
let audit_resolvers=merge(auditFilterState,auditInternalState)
export default audit_resolvers