export function getDummyData(state,action){
	switch (action.type) {
	  case "GET_DUMMY_DATA":
	    return action.data
	  default:
	    return state
  }
}