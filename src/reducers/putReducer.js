import {PUT_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function putInfo(state={},action) {
  switch (action.type) {
    case PUT_DATA:
          let putObj={},
          res = action.data,
          totalPut = 5;//state.ppsInfo.ppsData.totalPut;
          
          if(res.aggregate_data){
            putObj.value = res.aggregate_data.items_put;
	        putObj.count_complete=res.aggregate_data.count_complete;
	        
            

          }
          return Object.assign({}, state, {
            "putData" : putObj
          })

    default:
      return state
  }
}