//import * as mockData from '../../mock/mockDBData';
import {WS_MOCK, ADD_USER, FETCH_PPS_PROFILES} from '../constants/frontEndConstants';
import {ResponseParse} from '../utilities/responseParser';
import {AjaxParse} from '../utilities/AjaxParser';
import {receivePPSProfiles} from './../actions/ppsConfigurationActions'


const mockMiddleware = (function () {
    return store => next => action => {
        switch (action.type) {

            case WS_MOCK:
                //var msg=JSON.parse(evt.data);

                break;
            //This action is irrelevant to us, pass it on to the next middleware

            /**
             * The code need to be removed as a real API call will be hit
             */
            case FETCH_PPS_PROFILES:
                store.dispatch(receivePPSProfiles({}))
                break;


            default:
                return next(action);
        }
    }

})();

export default mockMiddleware