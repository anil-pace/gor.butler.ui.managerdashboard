jest.unmock('../../../src/components/login/loginForm');
jest.unmock('redux-mock-store');
jest.unmock('../../../src/actions/validationActions');
jest.unmock('../../../src/actions/loginAction');
import React  from 'react';
import { shallow, mount, render } from 'enzyme';
import LoginForm from '../../../src/components/login/loginForm';
import {IntlProvider} from 'react-intl-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as utilities from '../../../src/utilities/fieldCheck';

describe('Login form container tests', () => {	
	const mockStore = configureStore([]);
    const store = mockStore({
    			intl:{},appInfo:{},spinner:{}
    });

    const wrapper = mount(
    	<Provider store={store}>
    		<IntlProvider locale="en">
    			<LoginForm />
    		</IntlProvider>
    	</Provider>
    );
    it('Check username field validation', ()=>{
	    utilities.emptyField=jest.fn(
    		() => {
    			return { 
    				type:'mockedType'
    			}
        	}
    	);
    	const username = wrapper.find('input').at(0);
	    username.simulate('blur');
    	expect(utilities.emptyField).toBeCalled();
    });
    it('Check password field validation', ()=>{
	    utilities.emptyField=jest.fn(
    		() => {
    			return { 
    			type:'mockedType'
    			}
        	}
    	);
    	const username = wrapper.find('input').at(1);
	    username.simulate('blur');
    	expect(utilities.emptyField).toBeCalled();
    });
    it('Check form submission', ()=>{
	    global.sessionStorage=jest.fn();
	    global.sessionStorage.setItem=jest.fn();
    	const username = wrapper.find('input').at(2);
	    username.simulate('submit');
    	expect(sessionStorage.setItem).toBeCalled();
    });

});

