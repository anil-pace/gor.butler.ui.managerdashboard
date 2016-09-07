import React  from 'react';
import ReactDOM  from 'react-dom';
import HealthTabs from './components/health/healthTabs';
import Health from './components/health/health';
import Tabs from './containers/tabs';
import Header from './components/header/header';
import {setWsAction } from './actions/socketActions';
import { WS_CONNECT,WS_ONSEND } from './constants/appConstants'
import { wsInitData } from './constants/initData.js'
import Dropdown from './components/dropdown/dropdown';
import OrderStatsWidget from './containers/orderStatsWidget'
import PerformanceWidget from './containers/performanceWidget'
import AuditStatusWidget from './containers/auditStatusWidget'
import PutStatusWidget from './containers/putStatusWidget'
import PickStatusWidget from './containers/pickStatusWidget'
import { REQUEST_HEADER, getFetchData } from './actions/headerAction'
import { connect } from 'react-redux';
import Chart from './components/graphd3/graphd3';
import ChartHorizontal from './components/graphd3/graph_horizontal';




class App extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{
    	super(props)
    }	
  
  	componentWillMount(){
  		let userName =  this.props.userName,
  		authToken = this.props.authToken;
  		/*Creating Web Socket Connection*/
  		if(!authToken && !userName){
  			this.props.history.push("/login");
  		}
  		else{
  			this.props.initWebSocket() ;
  		}
  	}
  	componentWillReceiveProps(nextProps) {
    /**
     * Checking if the user is loggedin 
     * and redirecting to main page
     */
      if (nextProps.socketStatus && !nextProps.socketAuthorized) {
           let webSocketData = {
                'type': 'auth',
                'data' : {
                    "auth_token" : this.props.authToken
                }
            }
            this.props.sendAuthToSocket(webSocketData) ;
      }
      if(nextProps.socketStatus && nextProps.socketAuthorized && !nextProps.initDataSent){
      		this.props.initDataSentCall(wsInitData) ;
      }
    }
  	/**Render method called when component react renders
  	 * @return {[type]}
  	 */
	render(){
		var item1={heading:'Items to Stock', value:'4,74,579', low:'4 PPS stocking 3,546 items/hr'};
        var item2={heading1:'Orders to fulfill', value1:'120', low1:'8 PPS fulfilling per/hr', status1:'On schedule', heading2:'Remaining time', value2:'68mins', low2:'Completing in 8mins', status2:'23:59'};
		var items3={start:"09:10:25", name:"Krish verma gandhi sharma", post:"Manager"}
		

		
		return (
			
			<div className="mainContainer">
				<Header user={items3}/>
				<Tabs/>
				<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">
						<PutStatusWidget items={item1}/>
						<AuditStatusWidget items={item1}/>
					</div>
					<div className="col span_2_of_4 gorNoML">
						<PickStatusWidget />
					</div>
				</div>
				<div>
				<OrderStatsWidget/>
				<PerformanceWidget/>
				


				</div>


				</div>
				{this.props.children}
			</div>
			
		);
	}
};
/**
 * Function to pass state values as props
 */

function mapStateToProps(state,ownProps) {
 
 return {
 	authToken : state.authLogin.auth_token,
 	userName : state.authLogin.username,
 	socketStatus: state.recieveSocketActions.socketConnected,
 	socketAuthorized: state.recieveSocketActions.socketAuthorized,
 	initDataSent: state.recieveSocketActions.initDataSent
 }
}
/**
 * Function to dispatch action values as props
 */
function mapDispatchToProps(dispatch){
    return {
        initWebSocket: function(){ dispatch(setWsAction({type:WS_CONNECT})); },
        sendAuthToSocket: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); }
    }
};
export  default connect(mapStateToProps,mapDispatchToProps)(App);

