import {logoutRequest,loginFail} from '../actions/loginAction'
import { loginError } from '../actions/validationActions';
import { UNAUTH } from '../constants/messageConstants';
import { endWsAction } from '../actions/socketActions';

export function endSession(store){
        sessionStorage.clear();        
        store.dispatch(logoutRequest());
        store.dispatch(endWsAction());
        store.dispatch(loginError(UNAUTH)); 
}
