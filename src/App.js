/**
 * Importing the required modules
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import Tabs from './containers/tabs';
import Header from './components/header/header';
import {setWsAction } from './actions/socketActions';
import { WS_CONNECT,WS_ONSEND } from './constants/appConstants'
import { wsInitData } from './constants/initData.js';
import { REQUEST_HEADER, getFetchData } from './actions/headerAction'
import { connect } from 'react-redux';





class App extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{
    	super(props)
    }	
    /**
     * Called only once before rendering of component
     */
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
    /**
     * Called everytime a prop is changed
     * Does not get called on first render
     */
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
		/**
     * Need to remove the hardcoded data
     */
		var items3={start:"09:10:25", name:"Krish verma gandhi sharma", post:"Manager"};
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
 * Function to pass state values as props
 */

function mapStateToProps(state,ownProps) {
 
 return {
 	authToken : state.authLogin.auth_token,
 	userName : state.authLogin.username,
 	socketStatus: state.recieveSocketActions.socketConnected,
 	socketAuthorized:state.recieveSocketActions.socketAuthorized,
 	initDataSent:state.recieveSocketActions.initDataSent
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

