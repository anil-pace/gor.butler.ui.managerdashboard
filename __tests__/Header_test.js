jest.unmock('../src/components/header/Header');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import Header from '../src/components/header/Header';

describe('Header  Tests', () => {	
	var items={start:"19:12:25", name:"Aaron david lynch finch", post:"CEO"}
    
    const wrapper = shallow(<Header user={items}/>);

//Structure testing
	it('Should contain 16 div elements',()=>{
   		expect(wrapper.find('div').length).toEqual(16);
	 });

	it('Should contain 1 div with class gor-logo',()=>{
		expect(wrapper.find('.gor-logo').length).toEqual(1);
	});

	it('Expect no buttons',()=>{
		expect(wrapper.find('button').length).toEqual(0);
	});

//Content testing
	it('Butler system start time',()=>{
		expect(wrapper.find('.blockSystem .subText').text()).toBe('Start time:'+items.start);
	});

	it('User-name',()=>{
		expect(wrapper.find('.upperTextClient').text()).toEqual(items.name);
	});

	it('User-Post',()=>{
		expect(wrapper.find('.block .subTextClient').text()).toBe(items.post);
	});
    
	it('System start time changed',()=>{
    	items.start='13:12:09';
		expect(wrapper.find('.blockSystem .subText').text()).not.toBe('Start time:'+items.start);
	});

	it('Re-rendering Tilex',()=>{
  		expect(shallow(<Header user={items}/>).find('.blockSystem .subText').text()).toBe('Start time:'+items.start);
	});

});

