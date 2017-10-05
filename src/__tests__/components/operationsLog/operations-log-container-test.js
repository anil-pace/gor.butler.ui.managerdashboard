import React from 'react';
import { Provider } from 'react-redux';
import OperationsLogTab from '../../../containers/reportsTab/operationsLogTab.js';
import {messages} from '../../../../mock/mock-intl-json.js';
import {IntlProvider} from 'react-intl-redux';
import { mount} from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

const intl_messages = messages

 
describe('REACT-REDUX (Deep + passing the {store} using provider)',()=>{
   
    const initialState =  {
        recieveSocketActions:{
          socketAuthorized:true
        },
        filterInfo:{ 
          "filterState" : {}
        },
        operationsLogsReducer:{
          olData:[],
          hasDataChanged:true,
          reportsSpinner:false,
          filtersApplied:false,
          filtersModified: false,
          olWsData:[],
        },
        notificationSocketReducer:{
          notificationSocketConnected:true
        },
        authLogin:{
          username:'himanshu.s',
          timeOffset:"Asia/Kolkata"
        },
      intl:{
        locale:"en-US"
      }

    }
    const mockStore = configureStore()
    let store,container

    beforeEach(()=>{
        store = mockStore(initialState)
        container = mount( <Provider store={store}>
        <IntlProvider messages={intl_messages} locale={"en-US"} >
        <OperationsLogTab />
        </IntlProvider>
        </Provider> )//shallow(<SystemOverview store={store} /> )  
    })

    it('+++ render the connected(SMART) component', () => {
       expect(container.find(OperationsLogTab).length).toEqual(1)
    });
    
   /* it('+++ Checking count of zone tiles', () => {
       expect(container.find(Zone).length).toEqual(8)
    });*/
    

});