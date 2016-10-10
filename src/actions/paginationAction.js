import { PAGE_DATA } from '../constants/appConstants'

export function getPageData(data){
	console.log("in pagination action")
	console.log(data)
	return {
		type: PAGE_DATA,
		data
  	}
}

