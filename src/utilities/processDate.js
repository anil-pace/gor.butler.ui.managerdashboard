export function addDateOffSet(dateObj,timeOffset){
  var startDate=dateObj;
  startDate.setDate(startDate.getDate() + timeOffset);
  startDate=startDate.getFullYear() + '-' + (startDate.getMonth()+1)
             + '-' + startDate.getDate();
  return startDate;
}
export function getYear(){
	var dtToday=new Date();
	return dtToday.getFullYear();
}