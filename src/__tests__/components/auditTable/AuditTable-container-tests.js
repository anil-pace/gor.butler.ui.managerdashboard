import React from 'react';
import { Provider } from 'react-redux';
import AuditTable from '../../../containers/auditTab/auditTable.js';
import {messages} from '../../../../mock/mock-intl-json.js';
import {IntlProvider} from 'react-intl-redux';
import { shallow ,mount} from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'

const intl_messages = messages

 
describe('REACT-REDUX (Deep + passing the {store} using provider)',()=>{
    const initialState = {
          auditState:{
            "auditCompleted":0,
            "auditIssue":0,
            "locationAudit":0,
            "skuAudit":0,
            "totalProgress":0
              },
      state:{
        "colSortDirs":{

        },
        columnWidths:{
          "actions":420,
          "auditTypeValue":201.6,
          "completedTime":218.4,
          "display_id":151.2,
          "progress":285.6,
          "startTime":218.4,
          "status":184.8

        },
        sortedDataList:[]
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
        <AuditTable />
        </IntlProvider>
        </Provider> )//shallow(<SystemOverview store={store} /> )  
    })

    it('+++ render the connected(SMART) component', () => {
       expect(container.find(AuditTable).length).toEqual(1)
    });
    
    
    

});