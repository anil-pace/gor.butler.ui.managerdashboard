jest.unmock('../../../src/actions/performanceWidgetActions');
import * as actions from '../../../src/actions/performanceWidgetActions';
import { RENDER_WIDGET } from '../../../src/constants/appConstants';
describe ('Performance widget actions',()=>{
	it('Action for rendering data',()=>{
		const data='Sample data';
		const expectedAction={
		 type:RENDER_WIDGET,
		 data
		};
		expect(actions.renderPerformanceWidget(data)).toEqual(expectedAction);

	});
});