/**
 * Created by gaurav.m on 2/28/18.
 */
import merge from 'lodash.merge';
//import todos from './todo'
import auditFilterState from './filter';
import itemSearchFilterState from './itemSearch';
import auditInternalState from './InternalState';
import itemSearchInternalState from './ItemSearchInternalState';
let audit_resolvers = merge(
  auditFilterState,
  auditInternalState,
  itemSearchInternalState,
  itemSearchFilterState
);
export default audit_resolvers;
