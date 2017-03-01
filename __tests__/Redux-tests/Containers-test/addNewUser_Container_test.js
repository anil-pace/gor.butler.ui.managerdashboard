jest.unmock('../../../src/containers/userTab/addNewUser');
jest.unmock('redux-mock-store');
jest.unmock('../../../src/actions/validationActions');
jest.unmock('../../../src/actions/userActions');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import AddUser from '../../../src/containers/userTab/addNewUser';
import {IntlProvider} from 'react-intl-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as utilities from '../../../src/utilities/fieldCheck';

describe('AddUser form container tests', () => {	
	const mockStore = configureStore([]);
    const store = mockStore({
    			intl:{},appInfo:{},authLogin:{}
    });
    const mockReset=jest.fn();
    const mockRemove=jest.fn();    
    const wrapper = mount(
    	<Provider store={store}>
    		<IntlProvider locale="en">
    			<AddUser resetForm={mockReset} removeModal={mockRemove}/>
    		</IntlProvider>
    	</Provider>
    );
    it('Check username field validation', ()=>{
	    utilities.idStatus=jest.fn(
    		() => {
    			return { 
    				type:'mockedType'
    			}
        	}
    	);
    	const username = wrapper.find('input').at(0);
	    username.simulate('blur');
    	expect(utilities.idStatus).toBeCalled();
    });
    it('Check name field validation', ()=>{
	    utilities.nameStatus=jest.fn(
    		() => {
    			return { 
    			type:'mockedType'
    			}
        	}
    	);
    	const name = wrapper.find('input').at(2);
	    name.simulate('blur');
    	expect(utilities.nameStatus).toBeCalled();
    });
    it('Check modal close action', ()=>{
    	const closeButton = wrapper.find('.close');
	    closeButton.simulate('click');
    	expect(mockRemove).toBeCalled();
    });

});

