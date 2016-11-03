import React  from 'react';
import ReactDOM  from 'react-dom';
import Tab from '../components/tabs/tab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {tabSelected,subTabSelected} from '../actions/tabSelectAction';
import {displaySpinner} from '../actions/spinnerAction';
import {OVERVIEW,SYSTEM,ORDERS,USERS,TAB_ROUTE_MAP,INVENTORY} from '../constants/appConstants';
import { FormattedMessage } from 'react-intl';

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
        if(selTab !== OVERVIEW){
            this.props.displaySpinner(true);
        }
        else{
            this.props.displaySpinner(false)
        }
        
        this.props.tabSelected(TAB_ROUTE_MAP[selTab]);
        this.props.subTabSelected(null);
        sessionStorage.setItem('nextView', TAB_ROUTE_MAP[selTab]);
        sessionStorage.setItem('selTab', TAB_ROUTE_MAP[selTab]);
        sessionStorage.setItem('subTab', '');
    }
    
	render(){
    /**
     * This needs to be cleaned up when data is coming from server
     */
    let overview = <FormattedMessage id="overview.tab.heading" description="overview tab" 
              defaultMessage ="OVERVIEW"/>

    let system = <FormattedMessage id="system.tab.heading" description="system tab" 
              defaultMessage ="SYSTEM"/>
              
    let order = <FormattedMessage id="orders.tab.heading" description="orders tab" 
              defaultMessage ="ORDERS"/>
              
    let users = <FormattedMessage id="users.tab.heading" description="users tab" 
              defaultMessage ="USERS"/> 
    let inventory = <FormattedMessage id="inventory.tab.heading" description="inventory tab" 
              defaultMessage ="INVENTORY"/> 

    let overviewStatus = <FormattedMessage id="overviewStatus.tab.heading" description="overview Status " 
              defaultMessage ="Fulfiling orders"/>  

    let systemStatus = <FormattedMessage id="systemStatus.tab.heading" description="system Status" 
              defaultMessage ="Online"/>  

    let ordersStatus = <FormattedMessage id="ordersStatus.tab.heading" description="orders Status " 
              defaultMessage ="70% fulfilled"/>  

    let usersStatus = <FormattedMessage id="usersStatus.tab.heading" description="users Status " 
              defaultMessage ="35 users logged in"/>  
    let inventoryStatus = <FormattedMessage id="inventoryStatus.tab.heading" description="inventory Status " 
              defaultMessage ="78% space utilized"/>            
              
	const item1 = [
      { tab: overview, Status: overviewStatus, currentState:'gorOffline' }
    ]
    const item2 = [
      { tab: system, Status: systemStatus, currentState:'gorOnline' }
    ]
    const item3 = [
      { tab: order, Status: ordersStatus, currentState:'gorError' }
    ]
    
    const item5 = [
      { tab: users, Status: usersStatus, currentState:'gorOffline' }
    ]
    
    const item6 = [
      { tab: inventory, Status: inventoryStatus, currentState:'gorOffline' }
    ]
    
   
   
    
		return (
		<div className="gorTabs gorMainBlock">
		<Link to="/overview" onClick = {this.handleTabClick.bind(this,OVERVIEW)}>
			<Tab items={item1} changeClass={(this.props.tab.toUpperCase() === OVERVIEW ? 'sel' :"")} subIcons={false}/>
		</Link>

		<Link to="/system" onClick = {this.handleTabClick.bind(this,SYSTEM)}>
			<Tab items={item2} changeClass={(this.props.tab.toUpperCase() === SYSTEM ? 'sel' :"")} subIcons={true}/>
		</Link>

		<Link to="/orders" onClick = {this.handleTabClick.bind(this,ORDERS)}>
			<Tab items={item3} changeClass={(this.props.tab.toUpperCase() === ORDERS ? 'sel' :"")} subIcons={true}/>
		</Link>
    <Link to="/inventory" onClick = {this.handleTabClick.bind(this,INVENTORY)}>
      <Tab items={item6} changeClass={(this.props.tab.toUpperCase() === INVENTORY ? 'sel' :"")} subIcons={true}/>
    </Link>
		
		<Link to="/users" onClick = {this.handleTabClick.bind(this,USERS)}>
			<Tab items={item5} changeClass={(this.props.tab.toUpperCase() === USERS ? 'sel' :"")} subIcons={false}/>
		</Link>
	</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    
    return  {
         tab:state.tabSelected.tab || TAB_ROUTE_MAP[OVERVIEW]
    }
}

var mapDispatchToProps = function(dispatch){
	return {
		tabSelected: function(data){ dispatch(tabSelected(data)); },
        subTabSelected: function(data){ dispatch(subTabSelected(data)); },
        displaySpinner:function(data){dispatch(displaySpinner(data));}
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(Tabs) ;