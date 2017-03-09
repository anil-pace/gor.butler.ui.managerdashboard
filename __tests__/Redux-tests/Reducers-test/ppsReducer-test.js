jest.unmock('../../../src/reducers/ppsReducer');
jest.unmock('../../../mock/mockDBData');
import {ppsInfo} from '../../../src/reducers/ppsReducer';
import { resTypePPSperformance } from '../../../mock/mockDBData';
import {PPS_DATA} from '../../../src/constants/appConstants';

describe('Tests for PPS reducer',()=>{
	it('Handle data parsing',()=>{
		const action={
					type:PPS_DATA, 
					data:resTypePPSperformance
			};
		const expectData ={
				"ppsData":{
					"totalPut":1,
					"totalAudit":1,
					"totalPick":1
				}
				
			};
		expect(ppsInfo(undefined,action)).toEqual(expectData);
	});	
});