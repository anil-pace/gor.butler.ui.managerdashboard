import React  from 'react';
import ReactDOM  from 'react-dom';
import Tab from '../components/tabs/tab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {tabSelected,subTabSelected} from '../actions/tabSelectAction';
import {setInventorySpinner} from '../actions/inventoryActions';
import {OVERVIEW,SYSTEM,ORDERS,USERS,TAB_ROUTE_MAP,INVENTORY,AUDIT} from '../constants/appConstants';
import { FormattedMessage,FormattedNumber } from 'react-intl';

class Tabs extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	

    /**
     * [handleTabClick stores the selected tab]
     * @param  {[string]} selTab [Name of selected tab]
     * @return {[none]}        
     */
    handleTabClick(selTab){
    	/**
         * Displaying loader currently for User tab
         * only
         */
        switch(selTab){
          case INVENTORY:
          this.props.setInventorySpinner(true);
          break;
          default:
          this.props.setInventorySpinner(false);
        }
        
        
        this.props.tabSelected(TAB_ROUTE_MAP[selTab]);
        this.props.subTabSelected(null);
        sessionStorage.setItem('nextView', TAB_ROUTE_MAP[selTab]);
        sessionStorage.setItem('selTab', TAB_ROUTE_MAP[selTab]);
        sessionStorage.setItem('subTab', '');
    }

  _parseStatus()
  {
    let overview,system,order,ordersvalue,users,usersvalue,inventoryvalue,inventory,audit,overviewStatus,systemStatus,ordersStatus,usersStatus,auditStatus,inventoryStatus,offline,systemClass,ordersClass,auditClass,items={};

    offline = <FormattedMessage id="tabs.offline" description="offline" 
              defaultMessage ="Offline"/>;

    overview = <FormattedMessage id="overview.tab.heading" description="overview tab" 
              defaultMessage ="OVERVIEW"/>;

    system = <FormattedMessage id="system.tab.heading" description="system tab" 
              defaultMessage ="SYSTEM"/>;
              
    order = <FormattedMessage id="orders.tab.heading" description="orders tab" 
              defaultMessage ="ORDERS"/>;
              
    users = <FormattedMessage id="users.tab.heading" description="users tab" 
              defaultMessage ="USERS"/> ;
    inventory = <FormattedMessage id="inventory.tab.heading" description="inventory tab" 
              defaultMessage ="INVENTORY"/>; 

    audit = <FormattedMessage id="audit.tab.heading" description="audit tab" 
              defaultMessage ="AUDIT"/>;           

    if(!this.props.system_status)
    {
     overviewStatus=offline;
     systemStatus=offline;
     ordersStatus=offline;
     usersStatus=offline;
     inventoryStatus=offline; 
     auditStatus=offline;
     systemClass='gorOffline';
    }
    else
    {
      overviewStatus = <FormattedMessage id="overviewStatus.tab.heading" description="overview Status " 
              defaultMessage ="Fulfilling orders"/>;  

      if(!this.props.system_emergency)
      {
        systemStatus = <FormattedMessage id="systemStatus.tab.online" description="system Status online" 
              defaultMessage ="Online"/>;  
        systemClass='gorOnline';
      }
      else
      {
        systemStatus = <FormattedMessage id="systemStatus.tab.emergency" description="system Status emergency" 
              defaultMessage ="Emergency"/>;  
        systemClass='gor-alert';        
        overviewStatus = <FormattedMessage id="overviewStatus.tab.emergency" description="overview Status emergency" 
              defaultMessage ="Butlers stopped"/>;  
      }
      ordersvalue = <FormattedNumber value={this.props.orders_completed}/>
      ordersStatus = <FormattedMessage id="ordersStatus.tab.heading" description="orders Status " 
              defaultMessage ="{count}% fulfilled" values={{count:ordersvalue}}/>;  
      ordersClass='gorOnline';
      usersvalue = <FormattedNumber value={this.props.users_online}/>
      usersStatus = <FormattedMessage id="usersStatus.tab.heading" description="users Status " 
              defaultMessage ="{count} users online" values={{count:usersvalue}}/>;  
      inventoryvalue = <FormattedNumber value={this.props.space_utilized}/>
      inventoryStatus = <FormattedMessage id="inventoryStatus.tab.heading" description="inventory Status " 
              defaultMessage ="{count}% space utilized" values={{count:inventoryvalue}}/>;            
      auditStatus=<FormattedMessage id="auditStatus.tab.heading" description="audit Status " 
              defaultMessage ="{count} in progress" values={{count:this.props.audit_count?this.props.audit_count:'None'}}/>;          
      if(this.props.audit_count)
      {
        auditClass='gorOnline';
      }
      else
      {
        auditClass='gorOffline';
      }
    }

    items={overview:overview,system:system,order:order,users:users,inventory:inventory,audit:audit,overviewStatus:overviewStatus,systemStatus:systemStatus,ordersStatus:ordersStatus,auditStatus:auditStatus,usersStatus:usersStatus,inventoryStatus:inventoryStatus,systemClass:systemClass,ordersClass:ordersClass,auditClass:auditClass};
    return items;
  }
	render(){

  let items=this._parseStatus();
                      

		return (
		<div className="gorTabs gorMainBlock">
		<Link to="/overview" onClick = {this.handleTabClick.bind(this,OVERVIEW)}>
			<Tab items={{ tab: items.overview, Status: items.overviewStatus, currentState:'' }} changeClass={(this.props.tab.toUpperCase() === OVERVIEW ? 'sel' :'gor-normal-tab')} subIcons={false}/>
		</Link>

		<Link to="/system" onClick = {this.handleTabClick.bind(this,SYSTEM)}>
			<Tab items={{ tab: items.system, Status: items.systemStatus, currentState:items.systemClass }} changeClass={(!this.props.system_emergency?(this.props.tab.toUpperCase() === SYSTEM ? 'sel' :'gor-normal-tab'):'fail')} subIcons={true}/>
		</Link>

		<Link to="/orders" onClick = {this.handleTabClick.bind(this,ORDERS)}>
			<Tab items={{ tab: items.order, Status: items.ordersStatus, currentState:items.ordersClass }} changeClass={(this.props.tab.toUpperCase() === ORDERS ? 'sel' :'gor-normal-tab')} subIcons={false}/>
		</Link>


    <Link to="/audit" onClick = {this.handleTabClick.bind(this,AUDIT)}>
      <Tab items={{ tab: items.audit, Status: items.auditStatus, currentState:items.auditClass }} changeClass={(this.props.tab.toUpperCase() === AUDIT ? 'sel' :'gor-normal-tab')} subIcons={false}/>
      </Link>

    <Link to="/inventory" onClick = {this.handleTabClick.bind(this,INVENTORY)}>
      <Tab items={{ tab: items.inventory, Status: items.inventoryStatus, currentState:'' }} changeClass={(this.props.tab.toUpperCase() === INVENTORY ? 'sel' :'gor-normal-tab')} subIcons={false}/>
    </Link>
		
		<Link to="/users" onClick = {this.handleTabClick.bind(this,USERS)}>
			<Tab items={{ tab: items.users, Status: items.usersStatus, currentState:'' }} changeClass={(this.props.tab.toUpperCase() === USERS ? 'sel' :'gor-normal-tab')} subIcons={false}/>
		</Link>
	</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    return  {
         tab:state.tabSelected.tab || TAB_ROUTE_MAP[OVERVIEW],
         overview_status:state.tabsData.overview_status||null,
         system_emergency:state.tabsData.system_emergency||null,
         system_data:state.tabsData.system_data||{},
         users_online:state.tabsData.users_online||0,
         audit_count:state.tabsData.audit_count||0,
         space_utilized:state.tabsData.space_utilized||0,
         orders_completed:state.tabsData.orders_completed||0,
         system_status:state.tabsData.status||null
    }
}

var mapDispatchToProps = function(dispatch){
	return {
		tabSelected: function(data){ dispatch(tabSelected(data)); },
        subTabSelected: function(data){ dispatch(subTabSelected(data)); },
        setInventorySpinner:function(data){dispatch(setInventorySpinner(data));}
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(Tabs) ;