 jest.unmock('../../../src/actions/loginAction');
import * as actions from '../../../src/actions/loginAction';
import { LOGIN_REQUEST, LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE, AJAX_CALL} from '../../../src/constants/appConstants';

describe ('Login actions',()=>{
	it('Action for login request',()=>{
		const data='Sample form';
		const expectedLogin={
		 type:LOGIN_REQUEST,
		 data
		};
		expect(actions.loginRequest(data)).toEqual(expectedLogin);

	});
	it('Action for succesfull login authentication',()=>{
		const data={auth_token:'sdasdasd'};
		const expectedLogin={
		 type:LOGIN_SUCCESS,
		 data
		};
		expect(actions.receiveAuthData(data)).toEqual(expectedLogin);

	});
	it('Action for AJAX CALL',()=>{
		const params='sdasdasd';
		const expectedLogin={
		 type:AJAX_CALL,
		 params
		};
		expect(actions.authLoginData(params)).toEqual(expectedLogin);
	});
});