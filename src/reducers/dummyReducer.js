export default function getDummyData(state={
	id:"header",
	items:[]
},action){
	switch (action.type) {
	  case "GET_DUMMY_DATA":
	    return action.data
	  default:
	    return state
  }
}