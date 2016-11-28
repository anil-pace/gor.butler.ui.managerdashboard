import { BAR_D3_COMPONENT } from '../constants/frontEndConstants'

export  function d3barChart(state={},action){
	

	switch (action.type) {
	  
	  case BAR_D3_COMPONENT:
	  	
	    return Object.assign({}, state, {
	    	"componentd3":action.data
      })
	    
	  default:
	    return state
  }
}
