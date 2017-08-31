import React  from 'react';
import Tab from '../components/tabs/tab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {tabSelected,subTabSelected} from '../actions/tabSelectAction';
import {setFireHazrdFlag} from '../actions/tabActions';
import {modal} from 'react-redux-modal';
import {setInventorySpinner} from '../actions/inventoryActions';
import {setAuditSpinner} from '../actions/auditActions';
import {setButlerSpinner} from '../actions/spinnerAction';
import {setEmergencyModalStatus} from '../actions/tabActions';
import {OVERVIEW,SYSTEM,ORDERS,USERS,TAB_ROUTE_MAP,INVENTORY,AUDIT,
FULFILLING_ORDERS,GOR_OFFLINE,GOR_ONLINE,GOR_NORMAL_TAB,GOR_FAIL,
SOFT_MANUAL,HARD,SOFT,UTILITIES,FIRE_EMERGENCY_POPUP_FLAG,EMERGENCY_FIRE} from '../constants/frontEndConstants';
import { FormattedMessage,FormattedNumber,FormattedRelative } from 'react-intl';
import OperationStop from '../containers/emergencyProcess/OperationStop';
import OperationPause from '../containers/emergencyProcess/OperationPause';
import EmergencyRelease from '../containers/emergencyProcess/emergencyRelease'; 
import fireHazard from '../containers/emergencyProcess/fireHazard'; 
import GorToastify from '../components/gor-toastify/gor-toastify';


class Tabs extends React.Component{

    /**
     * [handleTabClick stores the selected tab]
     * @param  {[string]} selTab [Name of selected tab]
     * @return {[none]}        
     */
     constructor(props) 
  {  
    super(props);
    this._openPopup =  this._openPopup.bind(this);
  }

    _openPopup(){
        this.props.setFireHazrdFlag(false);      
  }


    handleTabClick(selTab){
    	/**
         * Displaying loader currently for User tab
         * only
         */
        switch(selTab){

          case SYSTEM:
          this.props.setButlerSpinner(true);
          break;

          case INVENTORY:
          this.props.setInventorySpinner(true);
          break;
          
          default:
          this.props.setInventorySpinner(false);
          this.props.setButlerSpinner(false);
          
        }
    }
  _stopOperation(stopFlag,additionalProps={}) {
      modal.add(OperationStop, {
        title: '',
        size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: false,
      emergencyPress: stopFlag,
      controller:additionalProps.controller_id,
      zone:additionalProps.zone_id,
      sensor:additionalProps.sensor_activated,
      poeEnabled:Object.keys(additionalProps).length ? true : false
      });

  }
  _emergencyRelease(releaseState){
      modal.add(EmergencyRelease, {
        title: '',
        size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: false,
      releaseState
      });  
  }
  _pauseOperation(stopFlag,additionalProps){
     modal.add(OperationPause, {
        title: '',
        size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: false,
      emergencyPress: stopFlag,
      controller:additionalProps.controller_id,
      zone:additionalProps.zone_id,
      sensor:additionalProps.sensor_activated,
      poeEnabled:Object.keys(additionalProps).length ? true : false
      });
  }
    _FireEmergencyRelease(){
      modal.add(fireHazard, {
        title: '',
        size: 'large customColor', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: false
      });  
  }
  
  componentWillReceiveProps(nextProps){

    if(!nextProps.isEmergencyOpen){
        if( nextProps.system_emergency  && nextProps.system_data === HARD){
            this.props.setEmergencyModalStatus(true);
            this._stopOperation(true, nextProps.zoneDetails);

        }
        else if(  nextProps.system_data === SOFT){
          this.props.setEmergencyModalStatus(true);
          this._pauseOperation(true, nextProps.zoneDetails);
        }
        else if( 
          nextProps.system_data === SOFT_MANUAL && 
          (nextProps.lastEmergencyState === HARD || nextProps.lastEmergencyState === SOFT)){
           let releaseState
            if(nextProps.lastEmergencyState === HARD){
              releaseState=HARD
            }
            else if(nextProps.lastEmergencyState === SOFT){
              releaseState=SOFT
            }
           this.props.setEmergencyModalStatus(true);
           this._emergencyRelease(releaseState);
        }     
    }
    
     if (nextProps.fireHazardType === EMERGENCY_FIRE && !nextProps.firehazadflag && !nextProps.fireHazardNotifyTime && nextProps.firehazadflag !== this.props.firehazadflag 
          || (nextProps.fireHazardType === EMERGENCY_FIRE && (this.props.firehazadflag === false) && nextProps.fireHazardNotifyTime !== this.props.fireHazardNotifyTime)){
          
            this._FireEmergencyRelease();
        }
    
  }
  _parseStatus()
  {
    let overview,system,order,ordersvalue,users,usersvalue,inventoryvalue,overviewClass,
        inventory,audit,overviewStatus,systemStatus,ordersStatus,usersStatus,auditStatus,inventoryStatus,
        offline,systemClass,ordersClass,auditClass,items={}, auditIcon=false,utilities;

    offline=<FormattedMessage id="tabs.offline" description="offline" 
              defaultMessage="Offline"/>;

    overview=<FormattedMessage id="overview.tab.heading" description="overview tab" 
              defaultMessage="OVERVIEW"/>;

    system=<FormattedMessage id="system.tab.heading" description="system tab" 
              defaultMessage="SYSTEM"/>;
              
    order=<FormattedMessage id="orders.tab.heading" description="orders tab" 
              defaultMessage="ORDERS"/>;
              
    users=<FormattedMessage id="users.tab.heading" description="users tab" 
              defaultMessage="USERS"/> ;
    inventory=<FormattedMessage id="inventory.tab.heading" description="inventory tab" 
              defaultMessage="INVENTORY"/>; 

    audit=<FormattedMessage id="audit.tab.heading" description="audit tab" 
              defaultMessage="AUDIT"/>;  

    utilities=<FormattedMessage id="utilities.tab.heading" description="audit tab" 
              defaultMessage="UTILITIES"/>;                     

    if(!this.props.system_status)
    {
     overviewStatus=offline;
     systemStatus=offline;
     ordersStatus=offline;
     usersStatus=offline;
     inventoryStatus=offline; 
     auditStatus=offline;
     systemClass=GOR_OFFLINE;
    }
    else
    {
      if(this.props.overview_status=== FULFILLING_ORDERS)
      {
        overviewStatus=<FormattedMessage id="overviewStatus.tab.fulfilling" description="overview Status fulfilling orders" 
              defaultMessage="Fulfilling orders"/>;  
      }
      else
      {
        overviewStatus=<FormattedMessage id="overviewStatus.tab.default" description="default overview Status" 
              defaultMessage="None"/>;          
      }
      if(this.props.system_emergency)
      {
        
        systemClass = 'gor-alert';
        systemStatus=<FormattedMessage id="overviewStatus.tab.stop" description="overview Status emergency" 
              defaultMessage="STOPPED"/>; 
      }
      else{
      systemStatus=<FormattedMessage id="systemStatus.tab.online" description="system Status online" 
              defaultMessage="Online"/>;  
      systemClass=GOR_ONLINE;
    }

      ordersvalue=<FormattedNumber value={this.props.orders_completed}/>
      ordersStatus=<FormattedMessage id="ordersStatus.tab.heading" description="orders Status " 
                                       defaultMessage="{count}% fulfilled" values={{count:ordersvalue}}/>;  
      ordersClass=GOR_ONLINE;

      usersvalue=<FormattedNumber value={this.props.users_online}/>
      usersStatus=<FormattedMessage id="usersStatus.tab.heading#" description="users Status " 
                                      defaultMessage="{count} {count,plural,=0 {user} one {user} other {users}} online" values={{count:this.props.users_online?this.props.users_online:"0"}}/>;  

      inventoryvalue=<FormattedNumber value={this.props.space_utilized}/>
      inventoryStatus=<FormattedMessage id="inventoryStatus.tab.heading" description="inventory Status " 
                                           defaultMessage="{count}% space utilized" values={{count:inventoryvalue}}/>;  
      if(this.props.audit_count){
        auditStatus=<FormattedMessage id="auditStatus.tab.heading" description="audit Status " 
                                     defaultMessage="{count} in progress" 
                                     values={{count:this.props.audit_count}}/>;
        auditClass=GOR_ONLINE;
      }
      else{          
      auditStatus=<FormattedMessage id="auditStatus.tab.heading.none" description="audit Status " 
                                     defaultMessage="None"/>; 
      auditClass=GOR_OFFLINE;
      }         
    
      if(this.props.audit_alert) {
        auditClass=(this.props.audit_alert?'gor-alert':auditClass);
        auditStatus=<FormattedMessage id="auditStatus.tab.alert.heading" description="audit Status alert" 
                                     defaultMessage="{count} {count,plural, one {alert} other {alerts}}" 
                                     values={{count:this.props.audit_alert?this.props.audit_alert:"0"}}/>;
       auditIcon=true;                                                        
      }
    }

    items={overview:overview,system:system,order:order,
           users:users,inventory:inventory,audit:audit,
           overviewStatus:overviewStatus, overviewClass:overviewClass,systemStatus:systemStatus,ordersStatus:ordersStatus,
           auditStatus:auditStatus,usersStatus:usersStatus,inventoryStatus:inventoryStatus,
           systemClass:systemClass,ordersClass:ordersClass,auditClass:auditClass,
           auditIcon:auditIcon, utilities:utilities};

    return items;
  }
   _processNotification(){
  
  var notificationWrap=[],singleNotification,time,timeText;
  var originalDate=this.props.fireHazardNotifyTime? new Date(this.props.fireHazardNotifyTime): (this.props.fireHazardStartTime? new Date(this.props.fireHazardStartTime):new Date());
  var convertedDate =  originalDate.getTime(); 
  var timeText= <FormattedRelative value={convertedDate} timeZone={this.props.timeZone}/>;

 if(this.props.fireHazardNotifyTime){
singleNotification=<GorToastify key={1}>
<div className="gor-toastify-content info">
                  <p className="msg-content">
                   <FormattedMessage id='operation.alert.resumed' 
                    defaultMessage="All operation has been resumed to normal state."
                            description="Text to resume operation"/>
                  <span className="gor-toastify-updated-time">{timeText}</span>
                  </p>
                  <span className="gor-toastify-details">
<span className="closeButton"  onClick={this._openPopup}></span>
</span>
     </div>
     
    </GorToastify>
}else
{
  singleNotification=<GorToastify key={2} >
   <div className="gor-toastify-content">
                  <p className="msg-content">
                   <FormattedMessage id='operation.alert.triggeremergency' 
                    defaultMessage="Fire emergency triggered.Follow evacuation procedures immediately"
                            description="Text button to trigger emergency"/>
                             <span className="gor-toastify-updated-time">{timeText}</span>
                  </p>
                  <span className="gor-toastify-details" onClick={this._openPopup}>

<FormattedMessage id='operation.alert.toastifydetails' 
                    defaultMessage="VIEW DETAILS"
                            description="Text button to viewdetails"/>
                  </span>

     </div>
    </GorToastify>
} 
    notificationWrap.push(singleNotification);
  return notificationWrap;
}
	render(){
  let items=this._parseStatus();
  let showFireHazardPopup;
  if(this.props.firehazadflag && (this.props.fireHazardNotifyTime || this.props.fireHazardStartTime))
  {
  showFireHazardPopup=true;
  }
  else
  {
  showFireHazardPopup=false;
  }
  
  let notificationWrap=this._processNotification();
  let showUtilityTab=this.props.config.utility_tab && this.props.config.utility_tab.enabled;
		return (
		<div className="gor-tabs gor-main-block">
		<Link to="/overview" onClick={this.handleTabClick.bind(this,OVERVIEW)}>
			<Tab items={{ tab: items.overview, Status: items.overviewStatus, currentState:items.overviewClass }} changeClass={(this.props.tab.toUpperCase()=== OVERVIEW ? 'sel' :GOR_NORMAL_TAB)} subIcons={false}/>
		</Link>

		<Link to="/system/sysOverview" onClick={this.handleTabClick.bind(this,SYSTEM)}>
			<Tab items={{ tab: items.system, Status: items.systemStatus, currentState:items.systemClass }} changeClass={(this.props.tab.toUpperCase()=== SYSTEM ? 'sel' :GOR_NORMAL_TAB)} subIcons={true}/>
		</Link>

		<Link to="/orders/waves" onClick={this.handleTabClick.bind(this,ORDERS)}>
			<Tab items={{ tab: items.order, Status: items.ordersStatus, currentState:items.ordersClass }} changeClass={(this.props.tab.toUpperCase()=== ORDERS ? 'sel' :GOR_NORMAL_TAB)} subIcons={false}/>
		</Link>


    <Link to="/audit" onClick={this.handleTabClick.bind(this,AUDIT)}>
      <Tab items={{ tab: items.audit, Status: items.auditStatus, currentState:items.auditClass}} changeClass={(this.props.tab.toUpperCase()=== AUDIT ? 'sel' :GOR_NORMAL_TAB)} subIcons={items.auditIcon}/>
      </Link>

    <Link to="/inventory" onClick={this.handleTabClick.bind(this,INVENTORY)}>
      <Tab items={{ tab: items.inventory, Status: items.inventoryStatus, currentState:'' }} changeClass={(this.props.tab.toUpperCase()=== INVENTORY ? 'sel' :GOR_NORMAL_TAB)} subIcons={false}/>
    </Link>
		
		<Link to="/users" onClick={this.handleTabClick.bind(this,USERS)}>
			<Tab items={{ tab: items.users, Status: items.usersStatus, currentState:'' }} changeClass={(this.props.tab.toUpperCase()=== USERS ? 'sel' :GOR_NORMAL_TAB)} subIcons={false}/>
		</Link>

    {showUtilityTab?<Link to="/utilities" onClick={this.handleTabClick.bind(this,UTILITIES)}>
      <Tab items={{ tab: items.utilities, Status:'', currentState:'' }} changeClass={(this.props.tab.toUpperCase()=== UTILITIES ? 'sel' :GOR_NORMAL_TAB)} subIcons={false}/>
    </Link>:""}
   {showFireHazardPopup?notificationWrap:""}
  </div>
		);
	}
}

function mapStateToProps(state, ownProps){

    return  {
         tab:state.tabSelected.tab || TAB_ROUTE_MAP[OVERVIEW],
         overview_status:state.tabsData.overview_status||null,
         system_emergency:state.tabsData.system_emergency||false,
         system_data:state.tabsData.system_data||null,
         lastEmergencyState:state.tabsData.lastEmergencyState,
         users_online:state.tabsData.users_online||0,
         audit_count:state.tabsData.audit_count||0,
         space_utilized:state.tabsData.space_utilized||0,
         orders_completed:state.tabsData.orders_completed||0,
         system_status:state.tabsData.status||null,
         audit_alert: state.tabsData.audit_alert || 0,
         config:state.config||{},
         firehazadflag:state.fireReducer.firehazadflag,
         fireHazardType:state.fireHazardDetail.emergency_type,
         fireHazardStartTime:state.fireHazardDetail.emergencyStartTime,
         fireHazardNotifyTime:state.fireHazardDetail.notifyTime,
         timeZone:state.authLogin.timeOffset,
        zoneDetails: state.tabsData.zoneDetails || {},
        isEmergencyOpen:state.tabsData.isEmergencyOpen

    }
}

var mapDispatchToProps=function(dispatch){
	return {
		tabSelected: function(data){ dispatch(tabSelected(data)); },
        subTabSelected: function(data){ dispatch(subTabSelected(data)); },
        setInventorySpinner:function(data){dispatch(setInventorySpinner(data));},
        setAuditSpinner:function(data){dispatch(setAuditSpinner(data));},
        setButlerSpinner:function(data){dispatch(setButlerSpinner(data))},
        setFireHazrdFlag:function(data){dispatch(setFireHazrdFlag(data))},
        setEmergencyModalStatus:function(data){dispatch(setEmergencyModalStatus(data));}
	}
};




export default connect(mapStateToProps,mapDispatchToProps)(Tabs) ;