import {logoutRequest,loginFail} from '../actions/loginAction'
import { endWsAction } from '../actions/socketActions';

export function endSession(store){
        sessionStorage.clear();        
        store.dispatch(logoutRequest());
        store.dispatch(endWsAction());
        store.dispatch(loginFail()); 
}
