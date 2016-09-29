jest.unmock('../../../src/reducers/auditReducer');
import {auditInfo} from '../../../src/reducers/auditReducer';
import { resTypeAudit } from '../../../mock/mockDBData';
import {AUDIT_DATA} from '../../../src/constants/appConstants';

describe('Tests for Audit reducer',()=>{
	it('Handle data parsing',()=>{
		const action={
					type:AUDIT_DATA, 
					data:resTypeAudit
			};
			
		const expectData ={
				"auditData":{
					"total_audited": 20687
				}
				
			};
		expect(auditInfo(undefined,action)).toEqual(expectData);
	});	
});