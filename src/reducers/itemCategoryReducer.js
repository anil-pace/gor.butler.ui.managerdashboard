import { ITEM_CATEGORY } from '../constants/frontEndConstants'; 
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function auditInfo(state={},action){
  switch (action.type) {
    case ITEM_CATEGORY:

          var res,itemCatData={};
          res=action.data;
          if(res.aggregate_data){
            if(res.aggregate_data.itemCatData)

              itemCatData=res.aggregate_data.itemCatData;

          }
          return Object.assign({}, state, { 
            "itemCategory" : itemCatData
          })

    default:
      return state
  }
}