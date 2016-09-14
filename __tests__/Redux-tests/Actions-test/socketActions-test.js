jest.unmock('../../../src/actions/socketActions');
import * as actions from '../../../src/actions/socketActions';
import { WS_CONNECTED,WS_ONMESSAGE } from '../../../src/constants/appConstants';

describe ('Socket actions',()=>{
	it('Action on message from socket',()=>{
		const data='Sample message';
		const expectedAction={
		 type:WS_ONMESSAGE,
		 data
		};
		expect(actions.wsOnMessageAction(data)).toEqual(expectedAction);

	});
	it('Action for socket response',()=>{
		const data='Some response';
		const expectedAction={
		 type:WS_CONNECTED,
		 data
		};
		expect(actions.wsResponseAction(data)).toEqual(expectedAction);

	});
	it('Action for setting socket connection',()=>{
		const params={type:'Mock_type',data:'Mock_data'};
		const expectedAction={
		 type:params.type,
		 data:params.data
		};
		expect(actions.setWsAction(params)).toEqual(expectedAction);
	});
});