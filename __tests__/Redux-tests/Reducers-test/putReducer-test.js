jest.unmock('../../../src/reducers/putReducer');
import {putInfo} from '../../../src/reducers/putReducer';
import { resTypePut } from '../../../mock/mockDBData';
import {PUT_DATA} from '../../../src/constants/appConstants';

describe('Tests for Put reducer',()=>{
	it('Handle data parsing',()=>{
		const action={
					type:PUT_DATA, 
					data:resTypePut
			};
			
		const expectData ={
				"putData":{
					"value": 256789
				}
				
			};
		expect(putInfo(undefined,action)).toEqual(expectData);
	});	
});