import React  from 'react';
import ReactDOM  from 'react-dom';
import Tabs from './containers/tabs';
import Header from './components/header/header';
import {setWsAction ,setMockAction} from './actions/socketActions';
import { WS_CONNECT,WS_ONSEND,WS_MOCK } from './constants/appConstants'
import { wsInitData } from './constants/initData.js'
import { REQUEST_HEADER, getFetchData } from './actions/headerAction'
import { connect } from 'react-redux';

class App extends React.Component{ 
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{  
    	super(props);
  }	
  
  	componentWillMount(){
      
        this.context.router.push("/login");

  	}
  	componentWillReceiveProps(nextProps) {
    /**
     * Checking if the user is loggedin 
     * and redirecting to main page
     */
      let loginAuthorized= nextProps.loginAuthorized,
      authToken=nextProps.authToken,
      socketStatus = nextProps.socketStatus;

      if(!loginAuthorized)
                 this.context.router.push("/login");

      if(MOCK === false){
        if(loginAuthorized && !socketStatus)
            this.props.initWebSocket() ; 
      }
      else{
        this.props.initMockData(wsInitData) ;
      }
      
      if(MOCK === false){
        if (loginAuthorized &&socketStatus && !nextProps.socketAuthorized) {
             let webSocketData = {
                  'type': 'auth',
                  'data' : {
                      "auth_token" : authToken
                  }
              }
              this.props.sendAuthToSocket(webSocketData) ;
        }
        if(loginAuthorized &&socketStatus && nextProps.socketAuthorized && !nextProps.initDataSent){
      	   	this.props.initDataSentCall(wsInitData) ;
        }
      }
      else{
          this.props.initMockData(wsInitData) ;
      }
    }
  	/**Render method called when component react renders
  	 * @return {[type]}
  	 */
	render(){
		var items3={start:"09:10:25", name:"Krish verma gandhi sharma", post:"Manager"}
		
		
		return (
			
			<div className="mainContainer">
				<Header user={items3}/>
				<Tabs/>
				{this.props.children}
			</div>
			
		);
	}
};
/**
 * [Passing Router to component through context]
 * @type {Object}
 */
App.contextTypes = {
        router: React.PropTypes.object.isRequired
}
/**
 * Function to pass state values as props
 */

function mapStateToProps(state,ownProps) {
 return {
  authToken: state.authLogin.auth_token,
 	loginAuthorized : state.authLogin.loginAuthorized,
 	socketStatus: state.recieveSocketActions.socketConnected,
 	socketAuthorized: state.recieveSocketActions.socketAuthorized,
 	initDataSent: state.recieveSocketActions.initDataSent,
  intl: state.intl
 }
}
/**
 * Function to dispatch action values as props
 */
function mapDispatchToProps(dispatch){
    return {
        initWebSocket: function(){ dispatch(setWsAction({type:WS_CONNECT})); },
        sendAuthToSocket: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        initMockData: function(data){dispatch(setMockAction({type:WS_MOCK,data:data}));}
    }
};
export  default connect(mapStateToProps,mapDispatchToProps)(App);

