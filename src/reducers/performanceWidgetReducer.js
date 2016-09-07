import { RENDER_WIDGET } from '../actions/performanceWidgetActions'

export  function performanceWidget(state={},action){
	switch (action.type) {
	  
	  case "RENDER_WIDGET":
	    return Object.assign({}, state, {
	    	"widget":action.data
      })
	    
	  default:
	    return state
  }
}
