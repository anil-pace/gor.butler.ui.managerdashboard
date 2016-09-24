import * as mockData from '../../mock/mockDBData';
import {WS_MOCK} from '../constants/appConstants';
import {ResponseParse} from '../utilities/responseParser';


const mockMiddleware = (function(){ 
  return store => next => action => {
    switch(action.type) {
      
      case WS_MOCK:
        //var msg = JSON.parse(evt.data);
        ResponseParse(store,mockData.resTypePPS); 
        ResponseParse(store,mockData.resTypePut); 
        ResponseParse(store,mockData.resTypeThroughPut);
        ResponseParse(store,mockData.resTypeAudit);
        ResponseParse(store,mockData.resTypeOrders);

        break;
      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default mockMiddleware