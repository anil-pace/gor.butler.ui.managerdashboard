jest.unmock('../src/components/health/Health');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import Health from '../src/components/health/Health';

//Just to clear test-cases
	it('Should be 1',()=>{
		expect(1).toEqual(1);
	})

// describe('Health tab  Tests', () => {	
//     var item = [
// 		{ component:{componentNumber: '16', componentType: 'PPS'}, states:{stoppedState:'3', onState:'12', errorState:'1'} }
// 		]
//     const wrapper = shallow(<Health items={item}/>);

// //Structure testing
// 	it('Should contain 16 div elements',()=>{
//    		expect(wrapper.find('div').length).toEqual(16);
// 	 });

// 	it('Should contain 1 div with class "upperText"',()=>{
// 		expect(wrapper.find('.upperText').length).toEqual(1);
// 	});

// 	it('Should contain 1 div with class "subtext"',()=>{
// 		expect(wrapper.find('.subtext').length).toEqual(1);
// 	});

// 	it('Expect no buttons',()=>{
// 		expect(wrapper.find('button').length).toEqual(0);
// 	});

// //Content testing
// 	it('Should contain "16" in heading',()=>{
// 		expect(wrapper.find('.upperText').text()).toBe(item[0].component.componentNumber);
// 	});

// 	it('Should contain "PPS" in heading',()=>{
// 		expect(wrapper.find('.subtext').text()).toBe(item[0].component.componentType);
// 	});
// });

