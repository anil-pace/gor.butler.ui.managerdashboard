/**
 * Importing Router dependencies
 */
import React  from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import {loginRequest} from '../actions/loginAction';


class Routes extends React.Component{
	constructor(props) 
	{
    	super(props);
       
    }
   requireAuth(nextState, replace ) {
  		if (sessionStorage.getItem('auth_token')) 
  		{
  			this.props.loginRequest();
    		replace({ nextPathname: nextState.location.pathname }, '/overview',nextState.location.query)
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
					<Route name="system" path="/system"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/systemTab').default);
				      },"system");
				    }}
					 > 
					 <IndexRoute 
					getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/systemTabs/notificationTab').default);
				      });
				    }}
					 />
					 	<Route name="butlerbots" path="/butlerbots"  
						 getComponent={(location, callback) => {
					      require.ensure([], function (require) {
					        callback(null, require('../containers/systemTabs/butlerbotTab').default);
					      });
					    }}
						 />

						 <Route name="pps" path="/pps"  
						 getComponent={(location, callback) => {
					      require.ensure([], function (require) {
					        callback(null, require('../containers/systemTabs/ppsTab').default);
					      });
					    }}
						 />

						 <Route name="chargingstation" path="/chargingstation"  
						 getComponent={(location, callback) => {
					      require.ensure([], function (require) {
					        callback(null, require('../containers/systemTabs/chargingStationsTab').default);
					      });
					    }}
						 />
						 <Route name="notification" path="/notification"  
						 getComponent={(location, callback) => {
					      require.ensure([], function (require) {
					        callback(null, require('../containers/systemTabs/notificationTab').default);
					      });
					    }}
						 />
					 </Route>

					 <Route name="orders" path="/orders"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/ordersTab').default);
				      });
				    }}
					 >
					 		 <IndexRoute 
					getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/orderTab/orderListTab').default);
				      });
				    }}
					 />

							 <Route name="waves" path="/waves"  
						 	getComponent={(location, callback) => {
				      		require.ensure([], function (require) {
				        	callback(null, require('../containers/orderTab/waveTab').default);
				      		});
				   			 }}
							 />

							 <Route name="orderlist" path="/orderlist"  
						 	getComponent={(location, callback) => {
				      		require.ensure([], function (require) {
				        	callback(null, require('../containers/orderTab/orderListTab').default);
				      		});
				   			 }}
							 />
					 </Route>

					

					<Route name="users" path="/users"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/usersTab').default);
				      });
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
function mapStateToProps(state, ownProps){
	return {
    };
}
var mapDispatchToProps = function(dispatch){
    return {
        loginRequest: function(){ dispatch(loginRequest()); }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Routes);