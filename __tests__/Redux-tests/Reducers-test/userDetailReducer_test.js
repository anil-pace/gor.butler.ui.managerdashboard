jest.unmock('../../../src/reducers/userDetailReducer');
import {userDetails} from '../../../src/reducers/userDetailReducer';
import {USER_DETAILS} from '../../../src/constants/frontEndConstants';

describe('Tests for user detail reducer ',()=>{
	it('Handle data parsing',()=>{
		const dataObj={
			complete_data:{
				userId:1
			}
		}
		const action={
					type:USER_DETAILS, 
					data:dataObj
			};
			
		const expectData ={
				"userDetails":{
					userId:1
				}
				
			};
		expect(userDetails(undefined,action)).toEqual(expectData);
	});	
	it('testing null case',()=>{
		const dataObj={};
		const action={
					type:USER_DETAILS, 
					data:dataObj
			};
			
		const expectData ={};
		expect(userDetails(undefined,action)).toEqual(expectData);
	});

	it('testing empty object case',()=>{
		const dataObj={complete_data:{}};
		const action={
					type:USER_DETAILS, 
					data:dataObj
			};
			
		const expectData ={"userDetails":{}};
		expect(userDetails(undefined,action)).toEqual(expectData);
	});	

	it('Handle data parsing',()=>{
		const dataObj={
			complete_data:{
				userId:"1"
			}
		}
		const action={
					type:USER_DETAILS, 
					data:dataObj
			};
			
		const expectData ={
				"userDetails":{
					userId:"1"
				}
				
			};
		expect(userDetails(undefined,action)).toEqual(expectData);
	});	


});