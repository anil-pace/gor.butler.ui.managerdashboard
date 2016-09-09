jest.unmock('../src/components/Login/login');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../src/components/Login/login';

describe('Login  Tests', () => {	
    var auth_token='ew23432';
    const wrapper = shallow(<Login store={auth_token}/>);

//Structure testing
	it('Should contain 1 div element',()=>{
   		expect(wrapper.find('div').length).toEqual(1);
	 });

	it('Should contain 3 input fields',()=>{
		expect(wrapper.find('input').length).toEqual(3);
	});

//Form testing
	wrapper.handleSubmit=jest.genMockFunction();

	it('Submit function called',()=>{
		wrapper.find('input[type="submit"]').simulate('click');
		expect(handleSubmit).toBeCalled();
	});

	it('Correct username and password submitted',()=>{
//		expect(wrapper.find('.upperTextClient').text()).toEqual(items.name);
	});

});

// jest.mock('../src/components/Login/login',()=>{
//    return {
//    	handleSubmit(e): jest.fn(()=>'')
//    }
// });