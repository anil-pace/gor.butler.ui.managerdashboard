jest.unmock('../src/components/tile2x/Tile2x');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import Tile2x from '../src/components/tile2x/Tile2x';

describe('Tile2x  Tests', () => {	
    var item={heading1:'This is it', value1:'10', low1:'These many per/hr', status1:'On schedule', heading2:'This is it', value2:'687', low2:'These many per/hr', status2:'23:59'};
    
    const wrapper = shallow(<Tile2x items={item}/>);

//Structure testing
	it('Should contain 9 div elements',()=>{
   		expect(wrapper.find('div').length).toEqual(9);
	 });

	it('Should contain 1 div with class "up-tile"',()=>{
		expect(wrapper.find('.gorTile-one').length).toEqual(1);
	});

	it('Expect no buttons',()=>{
		expect(wrapper.find('button').length).toEqual(0);
	});

//Content testing
	it('Should contain "This is it" in heading 1',()=>{
		expect(wrapper.find('.gorTile-one .gorHeading').text()).toBe(item.heading1);
	});

	it('Should contain 10 as value 1',()=>{
		expect(wrapper.find('.gorTile-one .gorHeading-value').text()).toEqual(item.value1);
	});

	it('Status should be items.status1',()=>{
		expect(wrapper.find('.gorTile-one .gorLow-tile').text()).toBe(item.low1);
	});

	it('Should contain "This is it" in heading 1',()=>{
		expect(wrapper.find('.gorTile-two .gorHeading').text()).toBe(item.heading2);
	});

	it('Should contain 10 as value 1',()=>{
		expect(wrapper.find('.gorTile-two .gorHeading-value').text()).toEqual(item.value2);
	});

	it('Status should be items.status1',()=>{
		expect(wrapper.find('.gorTile-two .gorLow-tile').text()).toBe(item.low2);
	});

	it('Test progress value',()=>{
		expect(wrapper.find('.gorTile-two .gorStatus').text()).not.toBe(item.status1);
	});
    
});

