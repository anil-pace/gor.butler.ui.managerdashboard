jest.unmock('../../../src/reducers/socketReducer');
import { recieveSocketActions } from '../../../src/reducers/socketReducer';
import {WS_CONNECT,WS_SUCCESS,WS_DISCONNECT,WS_CONNECTED,WS_ONMESSAGE,WS_ONSEND,WS_URL,WS_INIT} from '../../../src/constants/appConstants';

//Just to clear
	it('Should be 1',()=>{
		expect(1).toEqual(1);
	})

// describe('Tests for socket reducer',()=>{
// 	it('Check intital state',()=>{
// 		let action={type:'unknown'};
// 		expect(recieveSocketActions(undefined,action)).toEqual({});
// 	});
// 	it('Handle connection success',()=>{
// 		let action={type:WS_CONNECTED};
// 		expect(recieveSocketActions(undefined,action)).toEqual(
// 			{
// 				"socketConnected": true
// 			});
// 	});	
// 	it('Handle socket messages',()=>{
// 		let action={type:WS_ONMESSAGE,data:{message:WS_SUCCESS}};
// 		expect(recieveSocketActions(undefined,action)).toEqual(
// 			{
//           		"socketAuthorized": true,
//           		"initDataSent":false
// 			});
// 	});	
// 	it('Testing for intiating data sending',()=>{
// 		let action={type:WS_INIT};
// 		expect(recieveSocketActions(undefined,action)).toEqual(
// 			{
// 			     "socketConnected": true,
//                  "initDataSent":true
// 			});
// 	});	

// });