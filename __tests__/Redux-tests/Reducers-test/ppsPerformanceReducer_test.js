jest.unmock('../../../src/reducers/ppsPerformanceReducer');
import {PPSperformance} from '../../../src/reducers/ppsPerformanceReducer';
import {PARSE_PPS} from '../../../src/constants/backEndConstants';

describe('Tests for tab detail reducer ',()=>{
	it('Handle data parsing for ppsPerformance',()=>{
		const dataObj={
				aggregate_data:
				{
					ppsPerformane:256
				}
		}
		const action={
					type:PARSE_PPS, 
					data:dataObj
			};
			
		const expectData ={
				"ppsPerformance":{
				"aggregate_data":
				{
					"ppsPerformane":256
				}
		}
			};
		expect(PPSperformance(undefined,action)).toEqual(expectData);
	});	
	it('Handle data parsing for null',()=>{
		const dataObj={
				
		}
		const action={
					type:PARSE_PPS, 
					data:dataObj
			};
			
		const expectData ={};
		expect(PPSperformance(undefined,action)).toEqual(expectData);
	});		
});




