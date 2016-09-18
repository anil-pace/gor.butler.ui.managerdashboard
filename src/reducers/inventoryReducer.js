import {INVENTORY_DATA} from '../constants/appConstants';
/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function inventoryInfo(state={},action){
  switch (action.type) {
    case INVENTORY_DATA:
          var avail_volume=0,count_put=0,util_perc=0,util_vol=0,count_pick=0,avail_sku=0,stock_current=0,open_stock=0,res;
          res=action.data;
          if(res.aggregate_data){
              avail_volume=res.aggregate_data.total_available_volume;
              count_put=res.aggregate_data.count_put;
              util_perc=res.aggregate_data.total_utilized_percentage;
              util_vol=res.aggregate_data.total_utilized_volume;
              count_pick=res.aggregate_data.count_pick;
              avail_sku=res.aggregate_data.available_skus;
              stock_current=res.aggregate_data.stock_current;
              open_stock=res.aggregate_data.open_stock;                          
          }
            var ivData={
              "avail_volume":avail_volume,
              "count_put":count_put,
              "util_perc":util_perc,
              "util_vol":util_vol,
              "count_pick":count_pick,
              "avail_sku":avail_sku,
              "stock_current":stock_current,
              "open_stock":open_stock                          
            }

            return Object.assign({}, state, {
            "inventoryData" : ivData
            })

    default:
      return state
  }
}