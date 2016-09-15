import {PUT_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function putInfo(state={},action){
  switch (action.type) {
    case PUT_DATA:
          var count_complete=0,res;
          res=action.data;
          if(res.aggregate_data){
            if(res.aggregate_data.items_put)
              count_complete=parseInt(res.aggregate_data.items_put);
          }
          return Object.assign({}, state, {
            "putData" : count_complete
          })

    default:
      return state
  }
}