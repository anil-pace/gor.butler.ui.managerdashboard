
import React  from 'react';
import Tabs from './containers/tabs';
import Header from './components/header/header';
import {setWsAction ,setMockAction, endWsAction, updateSubscriptionPacket} from './actions/socketActions';
import {getTimeOffSetData,setTimeOffSetData, logoutRequest} from './actions/loginAction';
import {RECIEVE_HEADER, RECIEVE_TIME_OFFSET,WS_CONNECT,WS_ONSEND,
  WS_MOCK,USERS,TAB_ROUTE_MAP,OVERVIEW ,SYSTEM,ORDERS,INVENTORY,GET,POST,GET_CONFIGS,APP_JSON} from './constants/frontEndConstants';
  import { AUTO_LOGOUT } from './constants/messageConstants';
  import { wsOverviewData} from './constants/initData.js';
  import {TIME_ZONE_URL,GET_MD_CONFIG_URL} from './constants/configConstants'
  import {prevTabSelected} from './actions/tabSelectAction';
  import { connect } from 'react-redux'; 
  import TopNotifications from './components/topnotify/topnotify';
  import { notifyInfo} from './actions/validationActions';
import {userRequest} from './actions/userActions';


  class App extends React.Component{ 
  /**
   * Called once before rendering of component,used to displatch fetch action
   * @return {[type]}
   */

   constructor(props) 
   {  
    super(props);
    this.state={fetchedConfig:false}
  }

      componentWillMount() {
          if (this.props.location.pathname !== '/') {
              sessionStorage.setItem("nextUrl", this.props.location.pathname.concat(this.props.location.search))
          }

          this.context.router.push("/login");
          this.props.updateSubscriptionPacket(wsOverviewData);
      }

      _getConfig(){
          let request={
              'url': GET_MD_CONFIG_URL,
              'method': GET,
              'cause': GET_CONFIGS,
              'contentType': APP_JSON,
              'accept': APP_JSON,
              'token': this.props.auth_token,
              'sync':true
          }
          this.props.userRequest(request);
      }
  componentDidMount(){
    var timeOffset= sessionStorage.getItem("timeOffset");
    if(!timeOffset){
      let timeOffsetParams={
        'url':TIME_ZONE_URL,
        'method':GET,
        'cause':RECIEVE_TIME_OFFSET
      }
      this.props.getTimeOffSetData(timeOffsetParams);
    }
    else{
      this.props.setTimeOffSetData(timeOffset);
    }

    if (this.props.timeOutDuration){
      let durationInMilliSeconds=this.props.timeOutDuration * 1000;

     // trigger auto logout after time duration.
     setTimeout(function(){
      sessionStorage.clear();
      this.props.userLogout();
      this.props.endConnect();
      this.props.notifyInfo(AUTO_LOGOUT);
    }.bind(this), durationInMilliSeconds);
   }
 }

 componentWillReceiveProps(nextProps) {
    /**
     * Checking if the user is loggedin 
     * and redirecting to main page
     */

     
     let loginAuthorized= nextProps.loginAuthorized,
     authToken=nextProps.authToken,
     socketStatus=nextProps.socketStatus,
        /**
         * Gaurav Makkar
         * In case of navigation where the user might not
         * click the navigation tabs i,e BACK/FORWARD button
         * currentTab/subtab may cause the problem
         * with updated packet. So picking the current tab from the
         * props instead of picking it from sessionStorage.
         * @type {string}
         */
     // currTab=nextProps.subTab || nextProps.tab || null; //
     currTab=nextProps.location.pathname.substring(1, nextProps.location.pathname.length);

     if(!loginAuthorized){
       this.context.router.push("/login");
       return ;
     }
     let subscribeData;
     if(currTab) {
      subscribeData=(nextProps.wsSubscriptionData[currTab] || nextProps.wsSubscriptionData["default"]);
    }

    else {
      subscribeData=nextProps.wsSubscriptionData["default"];
    }
    
    if(!socketStatus){
        if (!this.state.fetchedConfig) {
            this._getConfig()
            this.setState({fetchedConfig: true})
        }
      this.props.initWebSocket() ; 
    }
    else if(!nextProps.socketAuthorized){
      let webSocketData={
        'type': 'auth',
        'data' : {
          "auth_token" : authToken
        }
      }
      this.props.sendAuthToSocket(webSocketData) ;
     // this.props.initDataSentCall(subscribeData) ;
    }
    else if(!nextProps.prevTab){
     // this.props.initDataSentCall(subscribeData) ;
      this.props.prevTabSelected(currTab || TAB_ROUTE_MAP[OVERVIEW]);
    }
    else if(nextProps.prevTab=== currTab && nextProps.location.pathname===this.props.location.pathname) {
      //  this.props.initDataSentCall(subscribeData) ;
    }
  }
    /**Render method called when component react renders
     * @return {[type]}
     */
     render(){
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
 App.contextTypes={
  router: React.PropTypes.object.isRequired
}
/**
 * Function to pass state values as props
 */


 function mapStateToProps(state,ownProps) {
   return {
    authToken: state.authLogin.auth_token,
    loginAuthorized : state.authLogin.loginAuthorized,
    timeOutDuration: state.authLogin.timeOutDuration,
    socketStatus: state.recieveSocketActions.socketConnected,
    socketAuthorized: state.recieveSocketActions.socketAuthorized,
    headerInfo:state.headerData.headerInfo,
    intl: state.intl,
    tab:state.tabSelected.tab,
    subTab:state.tabSelected.subTab,
    prevTab:state.tabSelected.prevTab,
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    
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
    getTimeOffSetData:function(data){ dispatch(getTimeOffSetData(data)); },
    setTimeOffSetData:function(data){ dispatch(setTimeOffSetData(data)); },
    endConnect: function(){ dispatch(endWsAction()); },
    userLogout: function(){ dispatch(logoutRequest()); },
    notifyInfo: function(data){dispatch (notifyInfo(data));},
    updateSubscriptionPacket: function(data){dispatch (updateSubscriptionPacket(data));},
      userRequest: function (data) {
          dispatch(userRequest(data));
      },
  }
};
export  default connect(mapStateToProps,mapDispatchToProps)(App);

