jest.unmock('../../../src/reducers/auditDetailReducer');
import {recieveAuditDetail} from '../../../src/reducers/auditDetailReducer';
import {RECIEVE_AUDIT_DATA,REFRESH_AUDIT} from '../../../src/constants/appConstants';

describe('Tests for Audit reducer',()=>{
	it('Handle data parsing',()=>{
		const dataObj={data:{data:[
				{total_pages:1,
				total_results:2,
				audit_list:{auditID:3}}]
			}
		}
		const action={
					type:RECIEVE_AUDIT_DATA, 
					data:dataObj
			};
			
		const expectData ={
				"auditDetail" : {auditID:3},
           		"totalPage" : 1,
            	"totalAudits" : 2
				};
		expect(recieveAuditDetail(undefined,action)).toEqual(expectData);
	});	
});