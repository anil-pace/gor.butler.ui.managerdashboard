export const REQUEST_HEADER = "REQUEST_HEADER";
export const RECIEVE_HEADER = "RECIEVE_HEADER";
export const RECIEVE_ITEM_TO_STOCK = "RECIEVE_ITEM_TO_STOCK";

function fetchData(type) {
  return dispatch => {
    
    return fetch(`./dummy.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveData(json)))
  }
}
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

export function getFetchData(type) {
  return (dispatch, getState) => {
      return dispatch(fetchData(type))
    
  }
}

