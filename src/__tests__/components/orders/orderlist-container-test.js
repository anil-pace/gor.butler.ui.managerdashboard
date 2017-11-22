import React from 'react';
import { Provider } from 'react-redux';
import OrderFilter from '../../../containers/orderTab/orderFilter.js';
import OrderListTab from '../../../containers/orderTab/orderListTab.js';
import FilterSummary from '../../../components/tableFilter/filterSummary.js';
import {messages} from '../../../../mock/mock-intl-json.js';
import {IntlProvider} from 'react-intl-redux';
import { shallow , mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { shallowWithIntl } from '/usr/local/projects/gor.butler.ui.managerdashboard/src/helpers/intl-enzyme-test-helper.js';



const intl_messages = messages
let instance,func;

describe('REACT-REDUX (Deep + passing the {store} using provider)',()=>{

  const initialState =  {
    sortHeaderState:{
      orderFilter: "" ,
      orderHeaderSort: "status",
      orderHeaderSortOrder: [],
    },

    spinner:{ 
      orderListSpinner : false,
    },

    filterOptions:{
      statusFilter: null,
    },

    getOrderDetail: undefined,

    intl:{
      messages: undefined
    },

    authLogin:{
      timeOffset: undefined,
      auth_token:undefined
    },

    filterInfo:{
      filterState:true,
      isFilterApplied:false,
      orderFilterStatus:undefined,
      orderFilterState:{}
    },

    recieveSocketActions:{
      socketDataSubscriptionPacket:undefined,
      socketAuthorized:undefined
    },

    ordersInfo:{
      orderListRefreshed:undefined
    },

    intl:{
      locale:"en-US"
    }

  }

  const mockStore = configureStore()
  let store,Wrapper,Wrapper_filterSummary
  const ordersDetail = [{
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-11-16T11:50:19.847+05:30",
    "exception": false,
    "order_id": "od1234e5467",
    "pick_before_time": "2016-07-26T11:38:41.378+05:30",
    "status": "complete",
    "total_orderlines": 0,
    "update_time": "2017-11-16T11:50:19.850+05:30"
  }, {
    "breached": true,
    "completed_orderlines": 0,
    "create_time": "2017-11-16T11:27:16.931+05:30",
    "exception": false,
    "order_id": "od12345467",
    "pick_before_time": "2016-07-26T11:38:41.378+05:30",
    "status": "pending",
    "total_orderlines": 0,
    "update_time": "2017-11-16T11:27:16.934+05:30"
  }, {
    "breached": true,
    "completed_orderlines": 0,
    "create_time": "2017-11-16T11:22:54.380+05:30",
    "exception": false,
    "order_id": "od1234567",
    "pick_before_time": "2016-07-26T11:38:41.378+05:30",
    "status": "ACCEPTED",
    "total_orderlines": 0,
    "update_time": "2017-11-16T11:22:54.385+05:30"
  }, {
    "breached": true,
    "completed_orderlines": 0,
    "create_time": "2017-11-16T10:33:50.484+05:30",
    "exception": false,
    "order_id": "od123456",
    "pick_before_time": "2017-07-26T11:38:41.378+05:30",
    "status": "ACCEPTED",
    "total_orderlines": 0,
    "update_time": "2017-11-16T10:33:50.493+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.616+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "INTERNAL_SERVER_ERROR",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.620+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.615+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "CREATED",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.620+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.615+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "BAD_REQUEST",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.620+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.614+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "fulfillable",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.620+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.614+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "abandoned",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.620+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.613+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "complete",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.620+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.604+05:30",
    "exception": false,
    "order_id": "2",
    "pick_before_time": null,
    "status": "rejected",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.620+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.602+05:30",
    "exception": false,
    "order_id": "3",
    "pick_before_time": null,
    "status": "abandoned",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.620+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.599+05:30",
    "exception": false,
    "order_id": "3",
    "pick_before_time": null,
    "status": "abandoned",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.597+05:30",
    "exception": false,
    "order_id": "2",
    "pick_before_time": null,
    "status": "fulfillable",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.596+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "rejected",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.594+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "ACCEPTED",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.594+05:30",
    "exception": false,
    "order_id": "2",
    "pick_before_time": null,
    "status": "not_fulfillable",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.593+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "not_fulfillable",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.592+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "complete",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.592+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "CREATED",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.590+05:30",
    "exception": false,
    "order_id": "09809809",
    "pick_before_time": null,
    "status": "CREATED",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.589+05:30",
    "exception": false,
    "order_id": "2",
    "pick_before_time": null,
    "status": "CREATED",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.584+05:30",
    "exception": false,
    "order_id": "2",
    "pick_before_time": null,
    "status": "CREATED",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.583+05:30",
    "exception": false,
    "order_id": "2",
    "pick_before_time": null,
    "status": "INTERNAL_SERVER_ERROR",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }, {
    "breached": false,
    "completed_orderlines": 0,
    "create_time": "2017-10-31T15:36:07.582+05:30",
    "exception": false,
    "order_id": "2",
    "pick_before_time": null,
    "status": "BAD_REQUEST",
    "total_orderlines": 0,
    "update_time": "2017-10-31T15:36:07.619+05:30"
  }]

beforeEach(()=>{
  store = mockStore(initialState);
  Wrapper = shallowWithIntl(
    <OrderFilter ordersDetail={ordersDetail} store={store} />
    );
  Wrapper_filterSummary = shallowWithIntl(
    <FilterSummary  store={store} isFilterApplied={false} />
    );

})

it('+++ render the connected(SMART) component', () => {
 
    expect(Wrapper.length).toEqual(1);
    const orderFilter = Wrapper.find('OrderFilter');
   expect(orderFilter.props().ordersDetail).toEqual(ordersDetail);
   //console.log(Wrapper.props());
   //console.log(Wrapper.instance().props);
   expect(Wrapper.prop('showFilter')).toEqual(initialState.filterInfo.filterState)
  //expect(Wrapper.dive().instance().props.orderFilter).toEqual("");
  //expect(Wrapper.hasClass('gor-Orderlist-table')).toEqual(true);
});

it('+++ render the connected(SMART) component', () => {
  
   expect(Wrapper_filterSummary.length).toEqual(1);
   //console.log(Wrapper_filterSummary.props());
   //console.log(Wrapper.props())
   //it renders props correctly
   //console.log(Wrapper.dive().instance().props.showFilter);
   expect(Wrapper.dive().instance().props.showFilter).toBe(true);

});

});