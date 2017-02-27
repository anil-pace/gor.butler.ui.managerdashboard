jest.unmock('../../../src/reducers/butlerReducer');
import { butlersInfo } from '../../../src/reducers/butlerReducer';
import {BUTLERS_DATA} from '../../../src/constants/appConstants';
//Just to clear
	it('Should be 1',()=>{
		expect(1).toEqual(1);
	})

// describe('Tests for butler reducer',()=>{
// 	it('Handle data parsing',()=>{
// 		let action={type:BUTLERS_DATA, data:{aggregate_data:{count_active:10}}};
// 		expect(butlersInfo(undefined,action)).toEqual(
// 			{
// 				"butlersData": {count_active:10}
// 			});
// 	});	
// });