jest.unmock('../../../src/reducers/tabDataReducer');
import {tabsData} from '../../../src/reducers/tabDataReducer';
import {GET_OVERVIEW,GET_SYSTEM,GET_INVENTORY,GET_AUDIT,GET_USERS,GET_ORDERS,GET_STATUS} from '../../../src/constants/frontEndConstants';

describe('Tests for tab detail reducer ',()=>{
	it('Handle data parsing for overvieew',()=>{
		const dataObj={
				header_data:
				{
					status:"online"
				}
		}
		const action={
					type:GET_OVERVIEW, 
					data:dataObj
			};
			
		const expectData ={
				"overview_status":"online"
			};
		expect(tabsData(undefined,action)).toEqual(expectData);
	});
	it('Handle data parsing for system',()=>{
		const dataObj={
				header_data:
				{
					emergency:true,
					emergency_level:"1"
				}
		}
		const action={
					type:GET_SYSTEM, 
					data:dataObj
			};
			
		const expectData ={
				"system_emergency":true,
				"system_data":"1"
			};
		expect(tabsData(undefined,action)).toEqual(expectData);
	});	
	it('Handle data parsing for users',()=>{
		const dataObj={
				header_data:
				{
					users_logged_in:"66",
				}
		}
		const action={
					type:GET_USERS, 
					data:dataObj
			};
			
		const expectData ={
				"users_online":66
			};
		expect(tabsData(undefined,action)).toEqual(expectData);
	});	
	it('Handle data parsing for audit',()=>{
		const dataObj={
				header_data:
				{
					audits_in_progress:"66",
					audit_alert: "2"
				}
		}
		const action={
					type:GET_AUDIT, 
					data:dataObj
			};
			
		const expectData ={
				"audit_count":66,
				"audit_alert":2
			};
		expect(tabsData(undefined,action)).toEqual(expectData);
	});			
	it('Handle data parsing for inventory',()=>{
		const dataObj={
				header_data:
				{
					space_utilized:"66.57",
				}
		}
		const action={
					type:GET_INVENTORY, 
					data:dataObj
			};
			
		const expectData ={
				"space_utilized":66.57
			};
		expect(tabsData(undefined,action)).toEqual(expectData);
	});	
	it('Handle data parsing for orders',()=>{
		const dataObj={
				header_data:
				{
					percentage_completed:"66.5755",
				}
		}
		const action={
					type:GET_ORDERS, 
					data:dataObj
			};
			
		const expectData ={
				"orders_completed":'66.58'
			};
		expect(tabsData(undefined,action)).toEqual(expectData);
	});	
	it('Handle data parsing for orders',()=>{
		const dataObj={
				header_data:
				{
					online:true,
				}
		}
		const action={
					type:GET_STATUS, 
					data:dataObj
			};
			
		const expectData ={
				"status":true
			};
		expect(tabsData(undefined,action)).toEqual(expectData);
	});			
});




