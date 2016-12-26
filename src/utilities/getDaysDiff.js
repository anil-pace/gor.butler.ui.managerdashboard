export function getDaysDiff(dateObj){
 var givenDate,today,daysDiff,absDays;
 givenDate=new Date(dateObj);
 today=new Date();
 daysDiff = Math.floor((today-givenDate) / (1000 * 3600 * 24));
 absDays=Math.abs(daysDiff);
 return absDays;
}