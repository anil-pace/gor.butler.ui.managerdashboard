import { translationMessages } from './i18n';

var brsrLocale=navigator.language;
brsrLocale=brsrLocale.substring(0,2);


export const preloadedState={
 "ordersInfo": 
 {"ordersData":{cut_off:null, count_pending:null, count_risk:null, eta:null, wave_end:null}},
 "intl":{
 	"messages": translationMessages[brsrLocale]
 } ,
 "appInfo":{
 	"notifyInfo":null
 }
}; 