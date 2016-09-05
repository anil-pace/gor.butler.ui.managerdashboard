import { RENDER_WIDGET } from '../constants/appConstants'

export function renderPerformanceWidget(data){
	return {
		type: RENDER_WIDGET,
		data
  	}
}

