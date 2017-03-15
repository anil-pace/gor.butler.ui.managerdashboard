jest.unmock('../../../src/reducers/orderDetailReducer');
import {getOrderDetail} from '../../../src/reducers/orderDetailReducer';
import {ORDER_RECIEVED} from '../../../src/constants/frontEndConstants';

describe('Tests for order detail reducer ',()=>{
	it('Handle data parsing for detail order',()=>{
		const dataObj={
				orders:{},
				total_size:5,
					total_pages:6,
					items_per_order:7,
					total_completed:8,
					total_pending:9,
		}
		const action={
					type:ORDER_RECIEVED, 
					data:dataObj
			};
			
		const expectData ={
				"ordersDetail" : {},
            "totalPage" : 6,
            "totalOrders" : 5,
            "itemsPerOrder": 7,
            "totalCompletedOrder":8,
            "totalPendingOrder":9
			};
		expect(getOrderDetail(undefined,action)).toEqual(expectData);
	});	

	it('Handle data parsing for detail order',()=>{
		const dataObj={
				total_size:5,
					total_pages:6,
					items_per_order:7,
					total_completed:8,
					total_pending:9,
		}
		const action={
					type:ORDER_RECIEVED, 
					data:dataObj
			};
			
		const expectData ={
			};
		expect(getOrderDetail(undefined,action)).toEqual(expectData);
	});		
});




