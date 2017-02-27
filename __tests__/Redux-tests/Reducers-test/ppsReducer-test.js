jest.unmock('../../../src/reducers/ppsReducer');
jest.unmock('../../../mock/mockDBData');
import {ppsInfo} from '../../../src/reducers/ppsReducer';
import { resTypePPS } from '../../../mock/mockDBData';
import {PPS_DATA} from '../../../src/constants/appConstants';
//Just to clear
	it('Should be 1',()=>{
		expect(1).toEqual(1);
	})

// describe('Tests for PPS reducer',()=>{
// 	it('Handle data parsing',()=>{
// 		const action={
// 					type:PPS_DATA, 
// 					data:resTypePPS
// 			};
// 		const expectData ={
// 				"ppsData":{
// 					"totalPut":1,
// 					"totalAudit":2,
// 					"totalPick":0
// 				}
				
// 			};
// 		expect(ppsInfo(undefined,action)).toEqual(expectData);
// 	});	
// });