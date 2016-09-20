/**
 * Importing Router dependencies
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import {loginRequest} from '../actions/loginAction';

class Routes extends React.Component{
	constructor(props) 
	{
    	super(props);
       
    }
   requireAuth(nextState, replaceState ) {
  		if (sessionStorage.getItem('auth_token')) 
  		{
  			this.props.loginRequest();
    		replaceState({ nextPathname: nextState.location.pathname }, '/overview',nextState.location.query)
 	 	}
	}
    render(){
		return (
		<Router history={hashHistory}>
			<Route name="default" path="/" 
			 getComponent={(location, callback) => {
		      require.ensure([], function (require) {
		        callback(null, require('../App').default);
		      });
		    }}
			 />
			 <Route name="login" path="/login"   onEnter={this.requireAuth.bind(this)} 
			 getComponent={(location, callback) => {
		      require.ensure([], function (require) {
		        callback(null, require('./Login/login').default);
		      });
		    }}
			  />
			<Route name="app" path="/md"  
			getComponent={(location, callback) => {
		      require.ensure([], function (require) {
		        callback(null, require('../App').default);
		      });
		    }}
			 >
					<IndexRoute 
					getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/OverviewTab').default);
				      });
				    }}
					 />
					<Route name="system" path="/system"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/systemTab').default);
				      });
				    }}
					 />
					
					<Route name="overview" path="/overview"  
					 getComponent={(location, callback) => {
				      require.ensure([], function (require) {
				        callback(null, require('../containers/OverviewTab').default);
				      });
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