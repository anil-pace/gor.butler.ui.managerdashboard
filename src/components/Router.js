/**
 * Importing Router dependencies
 */
import React  from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import {loginRequest} from '../actions/loginAction';
import Overview from '../containers/OverviewTab'; 
import {tabSelected,subTabSelected} from '../actions/tabSelectAction';
import {OVERVIEW,TAB_ROUTE_MAP} from '../constants/appConstants';


class Routes extends React.Component{
	constructor(props) 
	{
    	super(props);
       
    }
   requireAuth(nextState, replace ) {
  		if (sessionStorage.getItem('auth_token')) 
  		{
  			let subTab =(sessionStorage.getItem('subTab') || null);
  			let nextView ='/'+ (subTab || sessionStorage.getItem('nextView') || 'md');
  			let selTab =(sessionStorage.getItem('selTab') || TAB_ROUTE_MAP[OVERVIEW]);
  			
  			this.props.loginRequest();
  			this.props.tabSelected(selTab);
  			this.props.subTabSelected(subTab);
    		replace(nextView)
 	 	}
 	 	
	}
    render(){
		return (
		<Router history={hashHistory}>
			<Route name="default" path="/" 
			 getComponent={(location, callback) => {
		      require.ensure([], function (require) {
		        callback(null, require('../App').default);
		      },"defaultApp");
		    }}
			 />
			 <Route name="login" path="/login"   onEnter={this.requireAuth.bind(this)} 
			 getComponent={(location, callback) => {
		      require.ensure([], function (require) {
		        callback(null, require('./Login/login').default);
		      },"login");
		    }}
			  />
			<Route name="app" path="/md"  
			getComponent={(location, callback) => {
		      require.ensure([], function (require) {
		        callback(null, require('../App').default);
		      },"app");
		    }}
			 >
					<IndexRoute 
					getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/OverviewTab').default);
				      },"indexOverview");
				    }}
					 />
					<Route name="system" path="/system" className="gorResponsive"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/systemTab').default);
				      },"system");
				    }}
					 > 
					 <IndexRoute 
					getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/systemTabs/butlerbotTab').default);
				      },"indexButBot");
				    }}
					 />
					 	<Route name="butlerbots" path="/butlerbots"  
						 getComponent={(location, callback) => {
					      require.ensure([], function (require) {
					        callback(null, require('../containers/systemTabs/butlerbotTab').default);
					      },"butlerBots");
					    }}
						 />

						 <Route name="pps" path="/pps"  
						 getComponent={(location, callback) => {
					      require.ensure([], function (require) {
					        callback(null, require('../containers/systemTabs/ppsTab').default);
					      },"pps");
					    }}
						 />

						 <Route name="chargingstation" path="/chargingstation"  
						 getComponent={(location, callback) => {
					      require.ensure([], function (require) {
					        callback(null, require('../containers/systemTabs/chargingStationsTab').default);
					      },"chargingStation");
					    }}
						 />
					 </Route>

					 <Route name="orders" path="/orders"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/ordersTab').default);
				      },"orders");
				    }}
					 >
					 		 <IndexRoute 
					getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/orderTab/waveTab').default);
				      },"indexWave");
				    }}
					 />

							 <Route name="waves" path="/waves"  
						 	getComponent={(location, callback) => {
				      		require.ensure([], function (require) {
				        	callback(null, require('../containers/orderTab/waveTab').default);
				      		},"waveTab");
				   			 }}
							 />

							 <Route name="orderlist" path="/orderlist"  
						 	getComponent={(location, callback) => {
				      		require.ensure([], function (require) {
				        	callback(null, require('../containers/orderTab/orderListTab').default);
				      		},"orderList");
				   			 }}
							 />
					 </Route>



					<Route name="audit" path="/audit"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/auditTab').default);
				      },"audit");

				      }}
					 />

					<Route name="inventory" path="/inventory"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/inventoryTab').default);
				      },"inventory");


				    }}
					 />

					<Route name="users" path="/users"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/usersTab').default);
				      },"users");
				    }}
					 />

					<Route name="overview" path="/overview"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/OverviewTab').default);
				      },"overview");
				    }}
					 />
				</Route>
			</Router>
		)}

}

var mapDispatchToProps = function(dispatch){
    return {
        loginRequest: function(){ dispatch(loginRequest()); },
        tabSelected: function(data){ dispatch(tabSelected(data)) },
        subTabSelected: function(data){ dispatch(subTabSelected(data)) }
    }
};
export default connect(null,mapDispatchToProps)(Routes);