jest.unmock('../../../src/reducers/throughputReducer');
import {throughputInfo} from '../../../src/reducers/throughputReducer';
import {THROUGHPUT_DATA} from '../../../src/constants/frontEndConstants';

describe('Tests for throughput reducer',()=>{
	it('Handle data parsing',()=>{
		const dataObj={
			aggregate_data:{
				put_throughput:1201.1,
				pick_throughput:340.5,
				audit_throughput:45
			}
		}
		const action={
					type:THROUGHPUT_DATA, 
					data:dataObj
			};
			
		const expectData ={
				"throughputData":{
					put_throughput: 1201,
					pick_throughput:341,
					audit_throughput:45
				}
				
			};
		expect(throughputInfo(undefined,action)).toEqual(expectData);
	});	
});