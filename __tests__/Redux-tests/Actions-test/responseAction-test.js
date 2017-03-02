jest.unmock('../../../src/actions/responseAction');
import * as actions from '../../../src/actions/responseAction';
import {BUTLERS_DATA,PPS_DATA,PUT_DATA,AUDIT_DATA,INVENTORY_DATA,ORDERS_DATA,CHARGERS_DATA} from '../../../src/constants/frontEndConstants';

describe ('Response parsing actions',()=>{
	it('Action for pps resource',()=>{
		const data='Sample message';
		const expectedAction={
		 type:PPS_DATA,
		 data
		};
		expect(actions.receivePpsData(data)).toEqual(expectedAction);

	});
	it('Action for butlers resource',()=>{
		const data='Sample message';
		const expectedAction={
		 type:BUTLERS_DATA,
		 data
		};
		expect(actions.receiveButlersData(data)).toEqual(expectedAction);

	});
	it('Action for orders resource',()=>{
		const data='Sample message';
		const expectedAction={
		 type:ORDERS_DATA,
		 data
		};
		expect(actions.receiveOrdersData(data)).toEqual(expectedAction);

	});
});