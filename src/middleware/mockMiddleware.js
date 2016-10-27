import * as mockData from '../../mock/mockDBData';
import {WS_MOCK,ADD_USER} from '../constants/appConstants';
import {ResponseParse} from '../utilities/responseParser';
import {AjaxParse} from '../utilities/AjaxParser';


const mockMiddleware = (function(){ 
  return store => next => action => {
    switch(action.type) {
      
      case WS_MOCK:
        //var msg = JSON.parse(evt.data);
        ResponseParse(store,mockData.resTypePut); 
        ResponseParse(store,mockData.resTypeThroughPut);
        ResponseParse(store,mockData.resTypeAudit);
        ResponseParse(store,mockData.resTypeHistogram);
        ResponseParse(store,mockData.resTypeChargersDetail);
        ResponseParse(store,mockData.resTypeButlerDetail);
        ResponseParse(store,mockData.resTypePPSdetail);  
        ResponseParse(store,mockData.resTypeOrders);
        ResponseParse(store,mockData.resTypePPSperformance);
        ResponseParse(store,mockData.resTypeUsersDetails);
        ResponseParse(store,mockData.resTypeSnapShotHistory);
        ResponseParse(store,mockData.resTypeSnapShotToday);
        AjaxParse(store,mockData.resTypeNotify,ADD_USER);
        break;
      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default mockMiddleware