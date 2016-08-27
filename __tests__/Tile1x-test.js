jest.unmock('../src/components/tile1x/Tilex');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import Tilex from '../src/components/tile1x/Tilex';

describe('Tilex  Tests', () => {	
    const wrapper = shallow(<Tilex />);

	it('Should contain 5 div elements',()=>{
   		expect(wrapper.find('div').length).toBe(5);
	 });

	it('Should contain 1 div with class "up-tile"',()=>{
		expect(wrapper.find('.gorUp-tile').length).toBe(1);
	});

	it('Should contain "Items in stock" in heading',()=>{
		expect(wrapper.find('.gorHeading').text()).toBe('Items in stock');
	});

	it('Expect no buttons',()=>{
		expect(wrapper.find('button').length).toBe(0);
	});

	it('Should contain 1 image',()=>{
		expect(wrapper.find('img').length).toEqual(1);
	});

});

