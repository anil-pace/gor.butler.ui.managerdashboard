import { RENDER_STATSWIDGET } from '../actions/statsWidgetActions'

export  function statsWidget(state={},action){
	switch (action.type) {
	  
	  case "RENDER_STATSWIDGET":
	    return Object.assign({}, state, {
	    	"widget":action.data
      })
	    
	  default:
	    return state
  }
}
