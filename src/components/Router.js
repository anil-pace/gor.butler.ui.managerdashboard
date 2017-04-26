/**
 * Importing Router dependencies
 */
import React  from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import {loginRequest} from '../actions/loginAction';
import Overview from '../containers/OverviewTab'; 
import {tabSelected,subTabSelected} from '../actions/tabSelectAction';
import {setInventorySpinner} from '../actions/inventoryActions';
import {setAuditSpinner} from '../actions/auditActions';
import {setOrderListSpinner} from '../actions/orderListActions';
import {setWavesSpinner, setButlerSpinner, setPpsSpinner, setCsSpinner,setUserSpinner} from '../actions/spinnerAction';
import {AUDIT, ORDERLIST,WAVES,BUTLERBOTS, PPS, CHARGING,USER} from '../constants/appConstants';
import {OVERVIEW,TAB_ROUTE_MAP,INVENTORY} from '../constants/frontEndConstants';
import { translationMessages } from '../utilities/i18n';
import { updateIntl } from 'react-intl-redux';

class Routes extends React.Component{
	constructor(props) 
	{
    	super(props);
       
    }
   _requireAuth(nextState, replace ) {
  		if (sessionStorage.getItem('auth_token')) 
  		{
  			let subTab =(sessionStorage.getItem('subTab') || null);
  			let nextView ='/'+ (subTab || sessionStorage.getItem('nextView') || 'md');
  			let selTab =(sessionStorage.getItem('selTab') || TAB_ROUTE_MAP[OVERVIEW]);
  			this.props.loginRequest();
  			this.props.tabSelected(selTab);
  			this.props.subTabSelected(subTab);
  			switch(selTab.toUpperCase()){
  				case INVENTORY:
  				this.props.setInventorySpinner(true);
  				break;

  				case AUDIT:
  				this.props.setAuditSpinner(true);
  				break;
          case USER:
          this.props.setUserSpinner(true);
          break;

  				default:
  				this.props.setInventorySpinner(false);
  				this.props.setAuditSpinner(false);
          this.props.setUserSpinner(false);

  			}
  			if(subTab !== null) {
  				switch(subTab.toUpperCase()) {
  					case ORDERLIST:
  					this.props.setOrderListSpinner(true);
  					break;

  					case WAVES.toUpperCase():
  					this.props.setWavesSpinner(true);
  					break;

  					case BUTLERBOTS.toUpperCase():
  					this.props.setButlerSpinner(true);
  					break;

  					case PPS.toUpperCase():
  					this.props.setPpsSpinner(true);
  					break;

  					case CHARGING.toUpperCase():
  					this.props.setCsSpinner(true);
  					break;

  					case WAVES.toUpperCase():
  					this.props.setWavesSpinner(true);
  					break;


  					default:
  					this.props.setOrderListSpinner(false);
  					this.props.setWavesSpinner(false);
  					this.props.setButlerSpinner(false);
  					this.props.setPpsSpinner(false);
  					this.props.setCsSpinner(false);
  					this.props.setWavesSpinner(false);

         
  				}
  			}
    		replace(nextView)
 	 	}
   }
    _updateLanguage(){
    var sessionLocale = sessionStorage.getItem('localLanguage');
    
    sessionLocale = sessionLocale.substring(0,2);// since we need only the first two characters fo the locale.
    let data = {
        locale : sessionLocale,
        messages: translationMessages[sessionLocale]
    }
    sessionStorage.setItem('localLanguage', sessionLocale);
    this.props.updateIntl(data);
}


     _refreshPage(nextState, replace){
        if (sessionStorage.getItem('auth_token')) {
            this._requireAuth.call(this,nextState, replace);
        }

    if(sessionStorage.getItem('localLanguage')){
        this._updateLanguage.call(this);
    }
}
render(){
  var showUtilityTab = true;  
   return (
      <Router history={hashHistory}>
      <Route name="default" path="/" 
      getComponent={(location, callback) => {
         require.ensure([], function (require) {
            callback(null, require('../App').default);
        },"defaultApp");
     }}
     />
     <Route name="login" path="/login"   onEnter={this._refreshPage.bind(this)} 
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

     <Route name="audit" path="/audit"  
     getComponent={(location, callback) => {
         require.ensure([], function (require) {
            callback(null, require('../containers/auditTab').default);
        },"audit");
     }}
     />

     <Route name="users" path="/users"  
     getComponent={(location, callback) => {
         require.ensure([], function (require) {
            callback(null, require('../containers/userTab/usersTab').default);
        },"users");
     }}
     />

     {showUtilityTab?<Route name="utilities" path="/utilities"  
     getComponent={(location, callback) => {
         require.ensure([], function (require) {
            callback(null, require('../containers/utilityTab').default);
        },"utilities");
     }}
     />:""}

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
      updateIntl: function(params){ dispatch(updateIntl(params));},
        loginRequest: function(){ dispatch(loginRequest()); },
        tabSelected: function(data){ dispatch(tabSelected(data)) },
        subTabSelected: function(data){ dispatch(subTabSelected(data)) },
        setInventorySpinner:function(data){dispatch(setInventorySpinner(data));},
        setAuditSpinner: function(data){dispatch(setAuditSpinner(data))},
        setButlerSpinner: function(data){dispatch(setButlerSpinner(data))},
        setOrderListSpinner: function(data){dispatch(setOrderListSpinner(data))},
        setWavesSpinner: function(data){dispatch(setWavesSpinner(data))},
        setPpsSpinner: function(data){dispatch(setPpsSpinner(data))},
        setCsSpinner: function(data){dispatch(setCsSpinner(data))},
        setUserSpinner: function(data){dispatch(setUserSpinner(data))}

    }

};
export default connect(null,mapDispatchToProps)(Routes);