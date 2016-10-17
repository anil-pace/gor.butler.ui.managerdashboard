
import React  from 'react';
import ReactDOM  from 'react-dom';
import Tabs from './containers/tabs';
import Header from './components/header/header';
import {setWsAction ,setMockAction} from './actions/socketActions';
import {RECIEVE_HEADER, WS_CONNECT,WS_ONSEND,WS_MOCK,USERS,TAB_ROUTE_MAP,OVERVIEW ,SYSTEM,ORDERS,INVENTORY} from './constants/appConstants'
import { wsOverviewData} from './constants/initData.js';
import {prevTabSelected} from './actions/tabSelectAction';
import { connect } from 'react-redux'; 
import TopNotifications from './components/topnotify/topnotify';


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
      socketStatus = nextProps.socketStatus,
      currTab = nextProps.subTab || nextProps.tab || null;

      if(!loginAuthorized){
                 this.context.router.push("/login");
      }
      
      if(MOCK === false){
         let subscribeData;
        if(currTab) {
          subscribeData = (wsOverviewData[currTab] || wsOverviewData["default"]);
        }

        else {
          subscribeData = wsOverviewData["default"];
        }

        if(loginAuthorized){
            
            if(!socketStatus){
              this.props.initWebSocket() ; 
            }
            else if(!nextProps.socketAuthorized){
              let webSocketData = {
                  'type': 'auth',
                  'data' : {
                      "auth_token" : authToken
                  }
              }
              this.props.sendAuthToSocket(webSocketData) ;
            }
            else if(nextProps.prevTab !== currTab){
              this.props.initDataSentCall(subscribeData) ;
              this.props.prevTabSelected(currTab || TAB_ROUTE_MAP[OVERVIEW]) ;
            }
        }
        
      
      
      
    }
      else{
          this.props.initMockData(wsOverviewData["DEFAULT"]);
      }
    
    
    }
  	/**Render method called when component react renders
  	 * @return {[type]}
  	 */
	render(){
		//var items3={start:"09:00:25", name:"Krish verma gandhi sharma", post:"Manager"}
		
		
		return (
			
			<div className="mainContainer">
        <TopNotifications />
        <Header />
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
 	headerInfo:state.headerData.headerInfo,
  intl: state.intl,
  tab:state.tabSelected.tab,
  subTab:state.tabSelected.subTab,
  prevTab:state.tabSelected.prevTab
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
        initMockData: function(data){dispatch(setMockAction({type:WS_MOCK,data:data}));},
        prevTabSelected: function(data){ dispatch(prevTabSelected(data)) },
        getHeaderInfo: function(data){ dispatch(getHeaderInfo(data)) }
    }
};
export  default connect(mapStateToProps,mapDispatchToProps)(App);

