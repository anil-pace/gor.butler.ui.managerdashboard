import React from 'react';
import { Provider } from 'react-redux';
import SystemOverview from '../../../containers/systemTabs/sysOverview.js';
import Zone from '../../../components/systemOverview/zoneTile.js';
import {messages} from '../../../../mock/mock-intl-json.js';
import {IntlProvider} from 'react-intl-redux';
import { shallow ,mount} from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

const intl_messages = messages

 
describe('REACT-REDUX (Deep + passing the {store} using provider)',()=>{
    const initialState = {
      subscribed:false,
      recieveSocketActions:{
        socketAuthorized:true
      },
      sysOverviewReducer:{
        hasDataChanged:true,
        zones:{
          "zones_data":{    
                "1": {
                  "zone_status": "operation_normal" 
                },
                "2": {
                  "zone_status": "emergency_pause"
                },
                "3":{
                  "zone_status": "emergency_stop"
                },
                "4":{
                  "zone_status": "zone_pause_activated"
                },
                "5":{
                  "zone_status": "zone_clear_initiated"
                },
                "6":{
                  "zone_status": "zone_pause_initiated"
                },
                "7":{
                  "zone_status": "zone_clear_activated"
                },
                "8":{
                  "zone_status": "zone_clear_deactivated"
                }
              },
          "emergency_data":{
            "emergency_on": false,
            "emergency_type":"stop"
          }
        },
      zoneSubscriptionInitiated:true
      
    },
    zoningReducer:{
          zoneHeader:{}
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
        <SystemOverview />
        </IntlProvider>
        </Provider> )//shallow(<SystemOverview store={store} /> )  
    })

    it('+++ render the connected(SMART) component', () => {
       expect(container.find(SystemOverview).length).toEqual(1)
    });
    
    it('+++ Checking count of zone tiles', () => {
       expect(container.find(Zone).length).toEqual(8)
    });
    

});