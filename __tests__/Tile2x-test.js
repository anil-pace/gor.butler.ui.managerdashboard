jest.unmock('../src/components/tile2x/Tile2x');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import Tile2x from '../src/components/tile2x/Tile2x';

describe('Tile2x  Tests', () => {	
    var item={headingleft:'This is it', textleft:'10', lowleft:'These many per/hr', statusleft:'On schedule', headingright:'This is it', textright:'687', lowright:'These many per/hr', statusright:'23:59'};
    
    const wrapper = shallow(<Tile2x items={item}/>);

//Structure testing
	it('Should contain 9 div elements',()=>{
   		expect(wrapper.find('div').length).toEqual(9);
	 });

	it('Should contain 1 div with class "up-tile"',()=>{
		expect(wrapper.find('.gor-tile-one').length).toEqual(1);
	});

	it('Expect no buttons',()=>{
		expect(wrapper.find('button').length).toEqual(0);
	});

//Content testing
	it('Should contain "This is it" in heading 1',()=>{
		expect(wrapper.find('.gor-tile-one .gor-heading').text()).toBe(item.headingleft);
	});

	it('Should contain 10 as value 1',()=>{
		expect(wrapper.find('.gor-tile-one .gor-heading-value').text()).toBe(item.textleft);
	});

	it('Status should be items.statusleft',()=>{
		expect(wrapper.find('.gor-tile-one .gor-low-tile').text()).toBe(item.lowleft);
	});

	it('Should contain "This is it" in heading 1',()=>{
		expect(wrapper.find('.gor-tile-two .gor-heading').text()).toBe(item.headingright);
	});

	it('Should contain 10 as value 1',()=>{
		expect(wrapper.find('.gor-tile-two .gor-heading-value').text()).toBe(item.textright);
	});

	it('Status should be items.statusleft',()=>{
		expect(wrapper.find('.gor-tile-two .gor-low-tile').text()).toBe(item.lowright);
	});

	it('Test progress value',()=>{
		expect(wrapper.find('.gor-tile-two .gor-status').text()).not.toBe(item.statusleft);
	});
    
});

