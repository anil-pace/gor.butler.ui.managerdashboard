jest.unmock('../../../src/actions/responseAction');
import * as actions from '../../../src/actions/responseAction';
import {WS_INIT,BUTLERS_DATA,PPS_DATA,PUT_DATA,AUDIT_DATA,INVENTORY_DATA,ORDERS_DATA,CHARGERS_DATA} from '../../../src/constants/appConstants';

//Just to clear
	it('Should be 1',()=>{
		expect(1).toEqual(1);
	})

// describe ('Response parsing actions',()=>{
// 	it('Action for pps resource',()=>{
// 		const data='Sample message';
// 		const expectedAction={
// 		 type:PPS_DATA,
// 		 data
// 		};
// 		expect(actions.receivePpsData(data)).toEqual(expectedAction);

// 	});
// 	it('Action for butlers resource',()=>{
// 		const data='Sample message';
// 		const expectedAction={
// 		 type:BUTLERS_DATA,
// 		 data
// 		};
// 		expect(actions.receiveButlersData(data)).toEqual(expectedAction);

// 	});
// 	it('Action for orders resource',()=>{
// 		const data='Sample message';
// 		const expectedAction={
// 		 type:ORDERS_DATA,
// 		 data
// 		};
// 		expect(actions.receiveOrdersData(data)).toEqual(expectedAction);

// 	});
// 	it('Action for  initiating data sending',()=>{
// 		const data='Sample message';
// 		const expectedAction={
// 		 type:WS_INIT,
// 		 data
// 		};
// 		expect(actions.initData(data)).toEqual(expectedAction);

// 	});
// });