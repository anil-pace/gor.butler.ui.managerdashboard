import { BAR_D3_COMPONENT } from '../constants/appConstants'

export  function d3barChart(state={},action){
	console.log(action.type)

	switch (action.type) {
	  
	  case BAR_D3_COMPONENT:
	  	console.log("in d3 red")
	    return Object.assign({}, state, {
	    	"componentd3":action.data
      })
	    
	  default:
	    return state
  }
}
