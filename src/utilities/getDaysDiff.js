export function getDaysDiff(dateObj){
 var givenDate,today,daysDiff,absDays;
 givenDate=new Date(dateObj);
 today=new Date();
 daysDiff=Math.round((today-givenDate) / (1000 * 3600 * 24));
 absDays=Math.abs(daysDiff);
 return absDays;
}


export function getSecondsDiff(dateObj){
 var givenDate,today,diff,absSecond;
 givenDate=new Date(dateObj);
today=new Date();
diff =(givenDate.getTime() - today.getTime()) / 1000;
absSecond=Math.abs(Math.round(diff));
return absSecond;
}