import React  from 'react';
import ReactDOM  from 'react-dom';
import Tab from '../components/tabs/tab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {tabSelected} from '../actions/tabSelectAction';
import {OVERVIEW,SYSTEM,ORDERS,USERS} from '../constants/appConstants';
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

        
		const item1 = [
      { tab: 'OVERVIEW', Status: 'Fulfiling orders', currentState:'gorOffline' }
    ]
    const item2 = [
      { tab: 'SYSTEM', Status: 'Online', currentState:'gorOnline' }
    ]
    const item3 = [
      { tab: 'ORDERS', Status: '70% fulfilled', currentState:'gorError' }
    ]
    
    const item5 = [
      { tab: 'USERS', Status: '35 users logged in', currentState:'gorOffline' }
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