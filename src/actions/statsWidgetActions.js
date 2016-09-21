import { RENDER_STATSWIDGET } from '../constants/appConstants'

export function renderStatsWidget(data){
	return {
		type: RENDER_STATSWIDGET,
		data
  	}
}

