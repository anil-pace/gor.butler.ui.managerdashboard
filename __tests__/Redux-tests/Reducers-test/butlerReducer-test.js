jest.unmock('../../../src/reducers/butlerReducer');
import { butlersInfo } from '../../../src/reducers/butlerReducer';
import {BUTLERS_DATA} from '../../../src/constants/appConstants';

describe('Tests for butler reducer',()=>{
	it('Handle data parsing',()=>{
		let action={type:BUTLERS_DATA, data:{aggregate_data:{active_butlers:10, inactive_butlers:2}}};
		expect(butlersInfo(undefined,action)).toEqual(
			{
				"butlersData": {
					active:10,
					inactive:2
				}
			});
	});	
});