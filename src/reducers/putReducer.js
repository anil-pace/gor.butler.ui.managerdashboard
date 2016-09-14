import {PUT_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function putInfo(state={},action){
  switch (action.type) {
    case PUT_DATA:
      //state.selectedAction = action.type;
      //window.localStore.setItem('auth_token',action.data.auth_token)
          var count_complete=0,res;
          res=action.data;
          if(res.aggregate_data){
            count_complete=res.aggregate_data.count_complete;
          }
          // console.log("Put Data ");
          // console.log(count_complete);  
          return Object.assign({}, state, {
            "putData" : count_complete
          })

    default:
      return state
  }
}