import { RENDER_STATSWIDGET } from '../actions/statsWidgetActions'

export  function statsWidget(state={},action){
	switch (action.type) {
	  
	  case "RENDER_STATSWIDGET":
	    return Object.assign({}, state, {
	    	"statsWidget":action.data
      })
	    
	  default:
	    return state
  }
}
