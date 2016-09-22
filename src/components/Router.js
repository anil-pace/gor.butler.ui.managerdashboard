/**
 * Importing Router dependencies
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

class Routes extends React.Component{
	constructor(props) 
	{
    	super(props);
       
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
			 <Route name="login" path="/login"  
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

export default Routes