import React  from 'react';
import ReactDOM  from 'react-dom';
import Tab from '../components/tabs/tab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {tabSelected} from '../actions/tabSelectAction';
import {OVERVIEW,SYSTEM,ORDERS,USERS} from '../constants/appConstants';
import { FormattedMessage } from 'react-intl';
class Tabs extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
    handleOverviewClick(data){
    	var temp = OVERVIEW;
    	this.props.tabSelected(temp)
    }

    handleSystemClick(data){
    	var temp = SYSTEM;
    	this.props.tabSelected(temp)
    }
    handleOrdersClick(data){
    	var temp = ORDERS;
    	this.props.tabSelected(temp)
    }
    
    handleUsersClick(data){
    	var temp = USERS;
    	this.props.tabSelected(temp)
    }
    
	render(){
    let overview = <FormattedMessage id="overview.tab.heading" description="overview tab" 
              defaultMessage ="OVERVIEW"/>

    let system = <FormattedMessage id="system.tab.heading" description="system tab" 
              defaultMessage ="SYSTEM"/>
              
    let order = <FormattedMessage id="orders.tab.heading" description="orders tab" 
              defaultMessage ="ORDERS"/>
              
    let users = <FormattedMessage id="users.tab.heading" description="users tab" 
              defaultMessage ="USERS"/> 

    let overviewStatus = <FormattedMessage id="overviewStatus.tab.heading" description="overview Status " 
              defaultMessage ="Fulfiling orders"/>  

    let systemStatus = <FormattedMessage id="systemStatus.tab.heading" description="system Status" 
              defaultMessage ="Online"/>  

    let ordersStatus = <FormattedMessage id="ordersStatus.tab.heading" description="orders Status " 
              defaultMessage ="70% fulfilled"/>  

    let usersStatus = <FormattedMessage id="usersStatus.tab.heading" description="users Status " 
              defaultMessage ="35 users logged in"/>          
              
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
    var selectClass = {OVERVIEW:"gorMainBlock", SYSTEM:"gorMainBlock",ORDERS:"gorMainBlock", INVENTORY:"gorMainBlock", USERS:"gorMainBlock"};
    

    selectClass[this.props.tab] = "gorMainBlockSelect";
    
    
		return (
		<div className="gorTabs gorMainBlock">
		<Link to="/overview" onClick = {this.handleOverviewClick.bind(this)}>
			<Tab items={item1} changeClass={selectClass["OVERVIEW"]} subIcons={false}/>
		</Link>

		<Link to="/system" onClick = {this.handleSystemClick.bind(this)}>
			<Tab items={item2} changeClass={selectClass["SYSTEM"]} subIcons={true}/>
		</Link>

		<Link to="/orders" onClick = {this.handleOrdersClick.bind(this)}>
			<Tab items={item3} changeClass={selectClass["ORDERS"]} subIcons={true}/>
		</Link>
		
		<Link to="/users" onClick = {this.handleUsersClick.bind(this)}>
			<Tab items={item5} changeClass={selectClass["USERS"]} subIcons={false}/>
		</Link>
	</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    
    return  {
         tab:state.tabSelected.tab || "OVERVIEW",
    }
}

var mapDispatchToProps = function(dispatch){
	return {
		tabSelected: function(data){ dispatch(tabSelected(data)); }
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(Tabs) ;