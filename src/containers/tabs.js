import React  from 'react';
import ReactDOM  from 'react-dom';
import Tab from '../components/tabs/tab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {tabSelected} from '../actions/tabSelectAction';
import {displayLoader} from '../actions/loaderAction';
import {OVERVIEW,SYSTEM,ORDERS,USERS} from '../constants/appConstants';
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
    	if(selTab === USERS){
            this.props.displayLoader(true)
        }
        else{
            this.props.displayLoader(false)
        }
        this.props.tabSelected(selTab)
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
		<Link to="/overview" onClick = {this.handleTabClick.bind(this,OVERVIEW)}>
			<Tab items={item1} changeClass={selectClass["OVERVIEW"]} subIcons={false}/>
		</Link>

		<Link to="/system" onClick = {this.handleTabClick.bind(this,SYSTEM)}>
			<Tab items={item2} changeClass={selectClass["SYSTEM"]} subIcons={true}/>
		</Link>

		<Link to="/orders" onClick = {this.handleTabClick.bind(this,ORDERS)}>
			<Tab items={item3} changeClass={selectClass["ORDERS"]} subIcons={true}/>
		</Link>
		
		<Link to="/users" onClick = {this.handleTabClick.bind(this,USERS)}>
			<Tab items={item5} changeClass={selectClass["USERS"]} subIcons={false}/>
		</Link>
	</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    
    return  {
         tab:state.tabSelected.tab || "OVERVIEW"
    }
}

var mapDispatchToProps = function(dispatch){
	return {
		tabSelected: function(data){ dispatch(tabSelected(data)); },
        displayLoader:function(data){dispatch(displayLoader(data));}
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(Tabs) ;