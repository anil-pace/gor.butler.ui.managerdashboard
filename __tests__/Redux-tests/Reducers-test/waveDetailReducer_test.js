jest.unmock('../../../src/reducers/waveDetailReducer');
import {waveInfo} from '../../../src/reducers/waveDetailReducer';
import {ORDERS_DATA} from '../../../src/constants/frontEndConstants';

describe('Tests for wave detail reducer ',()=>{
	it('Handle data parsing',()=>{
		const dataObj={
			complete_data:{
				waveId:1
			}
		}
		const action={
					type:ORDERS_DATA, 
					data:dataObj
			};
			
		const expectData ={
				"waveData":{
					waveId:1
				}
				
			};
		expect(waveInfo(undefined,action)).toEqual(expectData);
	});	
	it('testing null case',()=>{
		const dataObj={};
		const action={
					type:ORDERS_DATA, 
					data:dataObj
			};
			
		const expectData ={};
		expect(waveInfo(undefined,action)).toEqual(expectData);
	});

	it('testing empty object case',()=>{
		const dataObj={complete_data:{}};
		const action={
					type:ORDERS_DATA, 
					data:dataObj
			};
			
		const expectData ={"waveData":{}};
		expect(waveInfo(undefined,action)).toEqual(expectData);
	});	
});