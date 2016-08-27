jest.unmock('../src/components/tile1x/Tilex');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import Tilex from '../src/components/tile1x/Tilex';

describe('Tilex  Tests', () => {	
    var item={heading:'This is it', value:'10', status:'These many per/hr'};
    
    const wrapper = shallow(<Tilex items={item}/>);

//Structure testing
	it('Should contain 5 div elements',()=>{
   		expect(wrapper.find('div').length).toEqual(4);
	 });

	it('Should contain 1 div with class "up-tile"',()=>{
		expect(wrapper.find('.gorUp-tile').length).toEqual(1);
	});

	it('Expect no buttons',()=>{
		expect(wrapper.find('button').length).toEqual(0);
	});

//Content testing
	it('Should contain "This is it" in heading',()=>{
		expect(wrapper.find('.gorHeading').text()).toBe(item.heading);
	});

	it('Should contain 10 as value',()=>{
		expect(wrapper.find('.gorHeading-value').text()).toEqual(item.value);
	});

	it('Status should be items.status',()=>{
		expect(wrapper.find('.gorLow-tile').text()).toBe(item.status);
	});
    
	it('Heading value changed',()=>{
    	item.heading='Give error';
		expect(wrapper.find('.gorHeading').text()).toBe(item.heading);
	});

//Style testing
	// it('Check Style',()=>{
	// 	expect(wrapper.find('.gorSingle').style).toBe("width", "47%");
	// });
});

