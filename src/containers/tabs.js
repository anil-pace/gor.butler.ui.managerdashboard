import React from 'react'
import Tab from '../components/tabs/tab'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { setFireHazrdFlag } from '../actions/tabActions'
import { modal } from 'react-redux-modal'
import { setInventorySpinner } from '../actions/inventoryActions'
import { setAuditSpinner } from '../actions/auditActions'
import { setButlerSpinner } from '../actions/spinnerAction'
import { setEmergencyModalStatus } from '../actions/tabActions'
import {
  OVERVIEW,
  SYSTEM,
  ORDERS,
  USERS,
  REPORTS,
  TAB_ROUTE_MAP,
  INVENTORY,
  AUDIT,
  FULFILLING_ORDERS,
  GOR_OFFLINE,
  GOR_ONLINE,
  GOR_NORMAL_TAB,
  GOR_FAIL,
  SOFT_MANUAL,
  HARD,
  SOFT,
  UTILITIES,
  DOWNLOADS,
  INBOUND,
  OUTBOUND, 
  CUSTOMERNOTIFICATIONS,
  FIRE_EMERGENCY_POPUP_FLAG,
  EMERGENCY_FIRE,
  NEWAUDIT,
  AUDITLISTING
} from '../constants/frontEndConstants'
import {
  FormattedMessage,
  FormattedNumber,
  FormattedRelative
} from 'react-intl'
import OperationStop from '../containers/emergencyProcess/OperationStop'
import OperationPause from '../containers/emergencyProcess/OperationPause'
import EmergencyRelease from '../containers/emergencyProcess/emergencyRelease'
import fireHazard from '../containers/emergencyProcess/fireHazard'
import GorToastify from '../components/gor-toastify/gor-toastify'
import { setNotificationNull } from '../actions/notificationAction'

class Tabs extends React.Component {
  /**
   * [handleTabClick stores the selected tab]
   * @param  {[string]} selTab [Name of selected tab]
   * @return {[none]}
   */
  constructor(props) {
    super(props)
    this.state = {
      isHardEmergencyOpen: this.props.isHardEmergencyOpen
    }
    this._openPopup =  this._openPopup.bind(this);
    this._redirectAudit=this._redirectAudit.bind(this);
  }

    _openPopup(){
        this.props.setFireHazrdFlag(false);      
  }
  _redirectAudit(){
    hashHistory.push({pathname: "/audit/auditlisting"})
  }

  loginManagerDashboard = selectTab => {
    let domain = window.location.origin

    let authtoken = sessionStorage.getItem('auth_token')

    switch (selectTab) {
      case 'Downloads':
        var new_win = window.open(domain + '/cockpit/#/reports/reportsdownload')
        setTimeout(function() {
          new_win.postMessage(authtoken, domain)
        }, 0)
        break
      case 'Inbound':
        var new_win = window.open(domain + '/cockpit/#/inbound/putsummary')
        setTimeout(function() {
          new_win.postMessage(authtoken, domain)
        }, 0)
        break
      case 'Outbound':
        var new_win = window.open(domain + '/cockpit/#/orders/ordersummary')
        setTimeout(function() {
          new_win.postMessage(authtoken, domain)
        }, 0)
        break
        case 'CustomerNotifications':
        var new_win = window.open(domain + '/cockpit/#/notification/notificationlist')
        setTimeout(function() {
          new_win.postMessage(authtoken, domain)
        }, 0)
        break
    }
  }

  handleTabClick(selTab) {
    /**
     * Displaying loader currently for User tab
     * only
     */
    switch (selTab) {
        case SYSTEM:
        this.props.setButlerSpinner(true)
        break

        case INVENTORY:
        this.props.setInventorySpinner(true)
        break

        case DOWNLOADS:
        this.loginManagerDashboard('Downloads')
        break

        case INBOUND:
        this.loginManagerDashboard('Inbound')
        
        break

        case OUTBOUND:
        this.loginManagerDashboard('Outbound')
        break

        case CUSTOMERNOTIFICATIONS:
        this.loginManagerDashboard('CustomerNotifications')
        break

      default:
        this.props.setInventorySpinner(false)
        this.props.setButlerSpinner(false)
    }
  }


  _stopOperation(stopFlag, additionalProps = {}) {
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
  _emergencyRelease(additionalProps){
      modal.add(EmergencyRelease, {
        title: '',
        size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: false,
      releaseState:additionalProps.releaseState,
      breached:additionalProps.breached,
      zone:additionalProps.zone
      });  
  }
  _pauseOperation(stopFlag,additionalProps){
     var zoneDetails = additionalProps.zoneDetails || {},
     breached = additionalProps.breached;
     modal.add(OperationPause, {
        title: '',
        size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: false,
      emergencyPress: stopFlag,
      controller:zoneDetails.controller_id,
      zone:zoneDetails.zone_id,
      sensor:zoneDetails.sensor_activated,
      poeEnabled:Object.keys(zoneDetails).length ? true : false,
      breached:breached
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

    if(nextProps.noticationData){
         setTimeout(this.props.setNotificationNull.bind(this), 5000);    	
    }

    if(!nextProps.isEmergencyOpen){
        if( nextProps.system_emergency  && nextProps.system_data === HARD){
            this.props.setEmergencyModalStatus(true);
            this._stopOperation(true, nextProps.zoneDetails);

        }
        else if(  nextProps.system_data === SOFT){
          this.props.setEmergencyModalStatus(true);
          this._pauseOperation(true, nextProps);
        }
        else if( 
          nextProps.system_data === SOFT_MANUAL && 
          (nextProps.lastEmergencyState === HARD || nextProps.lastEmergencyState === SOFT)){
           let releaseState,breached = nextProps.breached,
            zone = nextProps.zoneDetails.zone_id;
            if(nextProps.lastEmergencyState === HARD){
              releaseState=HARD
            }
            else if(nextProps.lastEmergencyState === SOFT){
              releaseState=SOFT
            }
      
           this.props.setEmergencyModalStatus(true);
           this._emergencyRelease({releaseState,breached,zone});
        }     
    }
    
     if (nextProps.fireHazardType === EMERGENCY_FIRE && !nextProps.firehazadflag && !nextProps.fireHazardNotifyTime && nextProps.firehazadflag !== this.props.firehazadflag 
          || (nextProps.fireHazardType === EMERGENCY_FIRE && (this.props.firehazadflag === false) && nextProps.fireHazardNotifyTime !== this.props.fireHazardNotifyTime)){
            this._FireEmergencyRelease();
        }
    

  }

  _parseStatus() {
    let overview,
      system,
      order,
      ordersvalue,
      users,
      reports,
      usersvalue,
      inventoryvalue,
      overviewClass,
      inventory,
      audit,
      overviewStatus,
      systemStatus,
      ordersStatus,
      usersStatus,
      auditStatus,
      inventoryStatus,
      offline,
      systemClass,
      ordersClass,
      auditClass,
      items = {},
      auditIcon = false,
      utilities,
      newaudit,
      newauditStatus,
      newauditClass,
      newauditIcon,
      downloads,
      inbound,
      outbound,
      customernotifications

    offline = (
      <FormattedMessage
        id='tabs.offline'
        description='offline'
        defaultMessage='Offline'
      />
    )

    overview = (
      <FormattedMessage
        id='overview.tab.heading'
        description='overview tab'
        defaultMessage='OVERVIEW'
      />
    )

    system = (
      <FormattedMessage
        id='system.tab.heading'
        description='system tab'
        defaultMessage='SYSTEM'
      />
    )

    order = (
      <FormattedMessage
        id='orders.tab.heading'
        description='orders tab'
        defaultMessage='ORDERS'
      />
    )

    users = (
      <FormattedMessage
        id='users.tab.heading'
        description='users tab'
        defaultMessage='USERS'
      />
    )
    inventory = (
      <FormattedMessage
        id='inventory.tab.heading'
        description='inventory tab'
        defaultMessage='INVENTORY'
      />
    )

    audit = (
      <FormattedMessage
        id='audit.tab.heading'
        description='audit tab'
        defaultMessage='AUDIT'
      />
    )

    utilities = (
      <FormattedMessage
        id='utilities.tab.heading'
        description='audit tab'
        defaultMessage='UTILITIES'
      />
    )
    reports = (
      <FormattedMessage
        id='reports.tab.heading'
        description='reports tab'
        defaultMessage='REPORTS'
      />
    )

    newaudit = (
      <FormattedMessage
        id='newaudit.tab.heading'
        description='new audit tab'
        defaultMessage='NEW AUDIT'
      />
    )

    downloads = (
      <FormattedMessage
        id='downloads.tab.heading'
        description='downloads tab'
        defaultMessage='DOWNLOADS'
      />
    )

    inbound = (
      <FormattedMessage
        id='inbound.tab.heading'
        description='inbound tab'
        defaultMessage='INBOUND'
      />
    )

    outbound = (
      <FormattedMessage
        id='outbound.tab.heading'
        description='outbound tab'
        defaultMessage='OUTBOUND'
      />
    )


    customernotifications = (
      <FormattedMessage
        id='customernotifications.tab.heading'
        description='customernotifications tab'
        defaultMessage='CUSTOMER NOTIFICATIONS'
      />
    )

    items = {
      overview: overview,
      system: system,
      order: order,
      users: users,
      inventory: inventory,
      audit: audit,
      downloads:downloads,
      inbound:inbound,
      outbound:outbound,
      customernotifications:customernotifications,
      reports: reports,
      overviewStatus: overviewStatus,
      overviewClass: overviewClass,
      systemStatus: systemStatus,
      ordersStatus: ordersStatus,
      auditStatus: auditStatus,
      usersStatus: usersStatus,
      inventoryStatus: inventoryStatus,
      systemClass: systemClass,
      ordersClass: ordersClass,
      auditClass: auditClass,
      auditIcon: auditIcon,
      utilities: utilities,
      newaudit: newaudit,
      newauditStatus: newauditStatus,
      newauditClass: newauditClass,
      newauditIcon: newauditIcon
    }

    return items;
  }
   _processNotification(notificationPopup,showFireHazardPopup){
  
  var notificationWrap=[],singleNotification,time,timeText;
  var originalDate=this.props.fireHazardNotifyTime? new Date(this.props.fireHazardNotifyTime): (this.props.fireHazardStartTime? new Date(this.props.fireHazardStartTime):new Date());
  var convertedDate =  originalDate.getTime(); 
  var timeText= <FormattedRelative value={convertedDate} timeZone={this.props.timeZone}/>;

 if(this.props.fireHazardNotifyTime && showFireHazardPopup){
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
}else if(this.props.noticationData){
  singleNotification=<GorToastify key={2}>
  <div className="gor-toastify-content whiteBG" onClick={this._redirectAudit}>
                    <div className={this.props.noticationData.type+'-Biggericon'}></div>
                    <p className="msg-content-full">
                    <div className='headermsg'>{this.props.noticationData.msg} </div>
                    <div className='descmsg'>{this.props.noticationData.desc}</div>            
                    </p>    
     </div>
    </GorToastify>
}
else
{
  singleNotification=<GorToastify key={3} >
   <div className="gor-toastify-content">
                  <p className="msg-content">
                   <FormattedMessage id='operation.alert.triggeremergency' 
                    defaultMessage="Fire emergency triggered. Follow evacuation procedures immediately"
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
    


  render() {
    let items = this._parseStatus()
    let showFireHazardPopup, notificationPopup
    if (
      this.props.firehazadflag &&
      (this.props.fireHazardNotifyTime || this.props.fireHazardStartTime)
    ) {
      showFireHazardPopup = true
    } else {
      showFireHazardPopup = false
    }
    if (this.props.noticationData) {
      notificationPopup = true
    }

    let notificationWrap = this._processNotification(
      notificationPopup,
      showFireHazardPopup
    )
    let showUtilityTab =
      this.props.config.utility_tab && this.props.config.utility_tab.enabled

    return (
      <div className='gor-tabs gor-main-block gor-scrollable-tab'>
        <Link to='/overview' onClick={this.handleTabClick.bind(this, OVERVIEW)}>
          <Tab
            items={{
              tab: items.overview,
              Status: items.overviewStatus,
              currentState: items.overviewClass
            }}
            changeClass={
              this.props.tab.toUpperCase() === OVERVIEW ||
              this.props.tab === 'md'
                ? 'sel'
                : GOR_NORMAL_TAB
            }
            subIcons={false}
          />
        </Link>

        <Link
          to='/orders/ordersummary'
          onClick={this.handleTabClick.bind(this, OUTBOUND)}
        >
          <Tab
            items={{
              tab: items.outbound
            }}
            changeClass={
              this.props.tab.toUpperCase() === OUTBOUND ? 'sel' : GOR_NORMAL_TAB
            }
          />
        </Link>

        <Link
          to='/inbound/putsummary'
          onClick={this.handleTabClick.bind(this, INBOUND)}
        >
          <Tab
            items={{
              tab: items.inbound,
            }}
            changeClass={
              this.props.tab.toUpperCase() === INBOUND ? 'sel' : GOR_NORMAL_TAB
            }
          />
        </Link>


        <Link
          to='/audit/auditlisting'
          onClick={this.handleTabClick.bind(this, AUDITLISTING)}
        >
          <Tab
            items={{
              tab: items.audit,
              Status: items.auditStatus,
              currentState: items.auditClass
            }}
            changeClass={
              this.props.tab.toUpperCase() === AUDIT ? 'sel' : GOR_NORMAL_TAB
            }
            subIcons={items.auditIcon}
          />
        </Link>

        <Link
          to='/inventory'
          onClick={this.handleTabClick.bind(this, INVENTORY)}
        >
          <Tab
            items={{
              tab: items.inventory,
              Status: items.inventoryStatus,
              currentState: ''
            }}
            changeClass={
              this.props.tab.toUpperCase() === INVENTORY
                ? 'sel'
                : GOR_NORMAL_TAB
            }
            subIcons={false}
          />
        </Link>

        <Link
          to='/system/sysOverview'
          onClick={this.handleTabClick.bind(this, SYSTEM)}
        >
          <Tab
            items={{
              tab: items.system,
              Status: items.systemStatus,
              currentState: items.systemClass
            }}
            changeClass={
              this.props.tab.toUpperCase() === SYSTEM ? 'sel' : GOR_NORMAL_TAB
            }
            subIcons={true}
          />
        </Link>

        
        
        

        <Link to='/users' onClick={this.handleTabClick.bind(this, USERS)}>
          <Tab
            items={{
              tab: items.users,
              Status: items.usersStatus,
              currentState: ''
            }}
            changeClass={
              this.props.tab.toUpperCase() === USERS ? 'sel' : GOR_NORMAL_TAB
            }
            subIcons={false}
          />
        </Link>

        <Link
          to='/reports/operationsLog'
          onClick={this.handleTabClick.bind(this, REPORTS)}
        >
          <Tab
            items={{ tab: items.reports }}
            changeClass={
              this.props.tab.toUpperCase() === REPORTS ? 'sel' : GOR_NORMAL_TAB
            }
            subIcons={false}
          />
        </Link>

        <Link
          to='reports/reportsdownload'
          onClick={this.handleTabClick.bind(this, DOWNLOADS)}
        >
          <Tab
            items={{
              tab: items.downloads,
            }}
            changeClass={
              this.props.tab.toUpperCase() === DOWNLOADS ? 'sel' : GOR_NORMAL_TAB
            }
          />
        </Link>


        <Link
          to='/notification/notificationlist'
          onClick={this.handleTabClick.bind(this, CUSTOMERNOTIFICATIONS)}
        >
          <Tab
            items={{
              tab: items.customernotifications,
            }}
            changeClass={
              this.props.tab.toUpperCase() === CUSTOMERNOTIFICATIONS ? 'sel' : GOR_NORMAL_TAB
            }
          />
        </Link>

        {showUtilityTab ? (
          <Link
            to='/utilities'
            onClick={this.handleTabClick.bind(this, UTILITIES)}
          >
            <Tab
              items={{ tab: items.utilities, Status: '', currentState: '' }}
              changeClass={
                this.props.tab.toUpperCase() === UTILITIES
                  ? 'sel'
                  : GOR_NORMAL_TAB
              }
              subIcons={false}
            />
          </Link>
          ) : (
          ''
        )}
       
        {showFireHazardPopup ? notificationWrap : ''}
        {notificationPopup ? notificationWrap : ''}
      </div>
    )
  }
}
  
 

function mapStateToProps(state, ownProps){

    return  {
         tab:state.tabSelected.tab || TAB_ROUTE_MAP[OVERVIEW],
         overview_status:state.tabsData.overview_status||null,
         system_emergency:state.tabsData.system_emergency||false,
         lastEmergencyState:state.tabsData.lastEmergencyState || "none",
         system_data:state.tabsData.system_data||null,
         lastEmergencyState:state.tabsData.lastEmergencyState,
         breached: state.tabsData.breached,
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
          isEmergencyOpen:state.tabsData.isEmergencyOpen,
          noticationData:state.notificationReducer.noticationData||null

    }
}

var mapDispatchToProps=function(dispatch){
	return {
        setInventorySpinner:function(data){dispatch(setInventorySpinner(data));},
        setAuditSpinner:function(data){dispatch(setAuditSpinner(data));},
        setButlerSpinner:function(data){dispatch(setButlerSpinner(data))},
        setFireHazrdFlag:function(data){dispatch(setFireHazrdFlag(data))},
        setEmergencyModalStatus:function(data){dispatch(setEmergencyModalStatus(data));},
        setNotificationNull:function(data){dispatch(setNotificationNull(data));}
	}
};




export default connect(mapStateToProps,mapDispatchToProps)(Tabs) ;