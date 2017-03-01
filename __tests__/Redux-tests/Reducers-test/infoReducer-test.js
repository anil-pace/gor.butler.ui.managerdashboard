jest.unmock('../../../src/reducers/infoReducer');
import {appInfo} from '../../../src/reducers/infoReducer';
import {LOGIN_ERROR, ERROR, NOTIFY_INFO,GOR_INFO, TICK_WHITE} from '../../../src/constants/frontEndConstants';

describe('Tests for appInfo reducer',()=>{
	it('Handle login error',()=>{
		const action={
					type:LOGIN_ERROR, 
					data:'mayday'
			};
			
		const expectData ={
				"loginInfo":{
					type: ERROR,
					msg: action.data
				}
				
			};
		expect(appInfo(undefined,action)).toEqual(expectData);
	});	
	it('Handle information notification',()=>{
		const action={
					type:NOTIFY_INFO, 
					data:'important'
			};
			
		const expectData ={
				"notifyInfo":{
					type: GOR_INFO,
					msg: action.data,
					icon: TICK_WHITE
				}
				
			};
		expect(appInfo(undefined,action)).toEqual(expectData);
	});	

});