import fetch from 'isomorphic-fetch'
import {REQUEST_HEADER,RECIEVE_HEADER,RECIEVE_ITEM_TO_STOCK} from '../constants/appConstants.js';



function receiveData(json) {
  switch (json.resource_type){
    case RECIEVE_ITEM_TO_STOCK:
    return {
        type: RECIEVE_ITEM_TO_STOCK,
        data: json.data
      }
    case 'items_to_audit':
    return {
        type: RECIEVE_ITEM_TO_AUDIT,
        data: json.data
      }
    case 'orders_to_fulfill':
    return {
        type: RECIEVE_ORDERS_TO_FULFILL,
        data: json.data
      }
      default:
      return {
        type: RECIEVE_HEADER,
        data: json.data
      }
  }
  
}
function getHeaderInfo(data){
	return {
		type: REQUEST_HEADER,
    	data:[]
  	}
}



