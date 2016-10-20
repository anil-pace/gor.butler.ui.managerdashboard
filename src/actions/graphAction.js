import { BAR_D3_COMPONENT } from '../constants/appConstants'

export function barD3Component(data){
	console.log("in d3 state**", data)
	return {
		type: BAR_D3_COMPONENT,
		data
  	}
}

