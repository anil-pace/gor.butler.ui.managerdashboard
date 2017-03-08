 jest.unmock('../../../src/actions/loginAction');
import * as actions from '../../../src/actions/loginAction';
import { LOGIN_REQUEST, LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE, AJAX_CALL,SET_USERNAME}
 from '../../../src/constants/frontEndConstants';

describe ('Login actions',()=>{
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
	it('Action for setting username',()=>{
		const data='sunahai';
		const expectedLogin={
		 type:SET_USERNAME,
		 data
		};
		expect(actions.setUsername(data)).toEqual(expectedLogin);
	});
});