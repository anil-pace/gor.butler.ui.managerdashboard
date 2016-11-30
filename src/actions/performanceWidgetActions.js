import { RENDER_WIDGET } from '../constants/frontEndConstants'

export function renderPerformanceWidget(data){
	return {
		type: RENDER_WIDGET,
		data
  	}
}

