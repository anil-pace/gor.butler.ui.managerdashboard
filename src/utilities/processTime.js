import {HR,MM,SS} from '../constants/frontEndConstants';;

export function secondsToTime(secs){
     let hh=0,mm=0,ss=0,mins,timestr='';
     hh=parseInt(secs/3600,10);
     secs%=3600;
     mm=parseInt(secs/60,10);
     ss=secs%60;

     if(hh)
     {
        timestr+=hh+HR;
     }
     timestr+=mm+MM;   
     if(ss)
     {
        timestr+=ss+ss;
     }
     return timestr;     
}	
