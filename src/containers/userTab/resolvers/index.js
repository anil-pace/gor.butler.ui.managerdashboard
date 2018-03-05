/**
 * Created by gaurav.m on 2/28/18.
 */
import merge from 'lodash.merge'
import todos from './todo'
import userFilterState from './filter'
let user_resolvers=merge(userFilterState,todos)
export default user_resolvers