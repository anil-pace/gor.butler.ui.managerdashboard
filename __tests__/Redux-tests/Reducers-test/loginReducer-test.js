jest.unmock('../../../src/reducers/loginReducer');
import { authLogin } from '../../../src/reducers/loginReducer';
import { LOGIN_REQUEST, LOGIN_REDIRECT, LOGIN_SUCCESS,
	LOGIN_FAILURE, AJAX_CALL, SET_USERNAME, SET_TIME_OFFSET} from '../../../src/constants/appConstants';


describe('Tests for login reducer',()=>{
	beforeAll(()=>{
       	global.sessionStorage = jest.fn();
       	global.sessionStorage.setItem = jest.fn();
      	global.sessionStorage.getItem = jest.fn(()=>{return 'mocked_value';});
	});
	it('Check intital state',()=>{
		let action={type:'unknown'};
		expect(authLogin(undefined,action)).toEqual({});
	});
	it('Handle Login success',()=>{
		let action={type:LOGIN_SUCCESS, data:{auth_token:'zyx', duration:320}};
		expect(authLogin(undefined,action)).toEqual(
		{
				auth_token:action.data.auth_token,
       		    loginAuthorized:true,
          	    connectionActive:true,
          	    timeOutDuration:action.data.duration
  		});
	});	
	it('Handle login on page refresh',()=>{
		let action={type:LOGIN_REQUEST};
		expect(authLogin(undefined,action)).toEqual(
		{
       		    loginAuthorized:true,
          	    connectionActive:true,
				auth_token:sessionStorage.getItem(),
				username:sessionStorage.getItem()				
  		});		

	});
	it('Set username',()=>{
		let action={type:SET_USERNAME,data:'user'};
		expect(authLogin(undefined,action)).toEqual(
		{
				username:action.data				
  		});		

	});
	it('Set time offset',()=>{
		let action={type:SET_TIME_OFFSET,data:'offset'};
		expect(authLogin(undefined,action)).toEqual(
		{
				timeOffset:action.data				
  		});		

	});

});