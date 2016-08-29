export const REQUEST_HEADER = "REQUEST_HEADER";

function fetchData(type) {
  return dispatch => {
    dispatch(getHeaderInfo(type))
    return fetch(`./dummy.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveData(type, json)))
  }
}
function receiveData(type, json) {
  return {
    type: REQUEST_HEADER,
    data: json.data
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

