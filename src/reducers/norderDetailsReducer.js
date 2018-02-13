import {ORDERS_FULFIL, ORDERS_SUMMARY} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function orderDetails(state={},action){
  switch (action.type) {
    case ORDERS_FULFIL:
      console.log("coming inside norderDetailsReducer => orderDetails => ORDERS_FULFIL");
      return Object.assign({}, state, {
	    	orderFulfilment: action.data || [],
      });
      break;

    case ORDERS_SUMMARY:
      console.log("coming inside norderDetailsReducer => orderDetails => ORDERS_SUMMARY");
      return Object.assign({}, state, {
        orderSummary: action.data || [],
      });
      break;

    default:
      return state
  }
}
