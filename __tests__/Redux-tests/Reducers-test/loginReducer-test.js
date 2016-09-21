jest.unmock('../../../src/reducers/loginReducer');
import { authLogin } from '../../../src/reducers/loginReducer';
import { LOGIN_REQUEST, LOGIN_REDIRECT, LOGIN_SUCCESS,LOGIN_FAILURE, AJAX_CALL} from '../../../src/constants/appConstants';

describe('Tests for login reducer',()=>{
	it('Check intital state',()=>{
		let action={type:'unknown'};
		expect(authLogin(undefined,action)).toEqual({});
	});
	it('Handle Login success',()=>{
		let action={type:LOGIN_SUCCESS, data:{auth_token:'zyx'}};
		expect(authLogin(undefined,action)).toEqual(
			{
				auth_token:action.data.auth_token,
				username:'admin'
			});
	});	
});