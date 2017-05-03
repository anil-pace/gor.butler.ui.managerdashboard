import {INVOICE_VALIDATION} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function utilityValidations(state={},action){
  switch (action.type) {
    case INVOICE_VALIDATION:
          var res = action.data;
          if(res.alert_data){
            return Object.assign({}, state, {
              "invalidInvoice" : true
            })
          }

          else {
            return Object.assign({}, state, {
              "invalidInvoice" : false
            })
          }

    default:
      return state
  }
}