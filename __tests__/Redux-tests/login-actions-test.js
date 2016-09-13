import * as actions from '../../src/actions/loginAction';
import { LOGIN_REQUEST, LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE, AJAX_CALL} from '../../constants/appConstants'

describe ('Login actions',()=>{
	it('Should create an action for AJAX call',()=>{
		const params='Sample form';
		const expectedLogin={
		 type:AJAX,
		 params
		};
		expect(actions.authLoginData(params)).toEqual(expectedLogin);
	});

});