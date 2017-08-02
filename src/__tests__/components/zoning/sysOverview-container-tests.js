import React from 'react';
import {SystemOverview} from '../../../components/systemOverview/zoneTile.js';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

describe('REACT-REDUX (Shallow + passing the {store} directly)',()=>{
    const initialState = {subscribed:false}
    const mockStore = configureStore()
    let store,container

    beforeEach(()=>{
        store = mockStore(initialState)
        container = shallow(<SystemOverview store={store} /> )  
    })

    it('+++ render the connected(SMART) component', () => {
       expect(container.length).toEqual(1)
    });

   /* it('+++ check Prop matches with initialState', () => {
       expect(container.prop('output')).toEqual(initialState.subscribed)
    });*/

});