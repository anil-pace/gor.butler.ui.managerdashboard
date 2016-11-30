import {PUT_DATA} from '../constants/frontEndConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function putInfo(state={},action) { 
  switch (action.type) {
    case PUT_DATA:
          let putObj={},
          res = action.data
          
          if(res.aggregate_data){
            putObj.value = res.aggregate_data.items_put; 

          }
          return Object.assign({}, state, {
            "putData" : putObj
          })

    default:
      return state
  }
}