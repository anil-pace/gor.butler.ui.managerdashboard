jest.unmock('../../../src/reducers/ppsDetailReducer');
import {PPSDetail} from '../../../src/reducers/ppsDetailReducer';
import {PPS_DETAIL} from '../../../src/constants/backEndConstants';

describe('Tests for tab detail reducer ',()=>{
	it('Handle data parsing for ppsPerformance',()=>{
		const dataObj={
				complete_data:
				{
					ppsDetail:256
				}
		}
		const action={
					type:PPS_DETAIL, 
					data:dataObj
			};
			
		const expectData ={
				"PPStypeDetail":{
					ppsDetail:256
				}
			};
		expect(PPSDetail(undefined,action)).toEqual(expectData);
	});	
	it('Handle data parsing for null',()=>{
		const dataObj={
				
		}
		const action={
					type:PPS_DETAIL, 
					data:dataObj
			};
			
		const expectData ={};
		expect(PPSDetail(undefined,action)).toEqual(expectData);
	});		
});




