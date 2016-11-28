import { RENDER_STATSWIDGET } from '../constants/frontEndConstants'

export function renderStatsWidget(data){
	return {
		type: RENDER_STATSWIDGET,
		data
  	}
}

