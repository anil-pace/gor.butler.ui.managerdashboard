import React  from 'react';
import ReactDOM  from 'react-dom';
import Tab from '../components/tabs/tab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;

class Tabs extends React.Component{
	constructor(props) 
	{
    	super(props);

    }	
	render(){
		

		const item1 = [
      { tab: 'OVERVIEW', Status: 'Fulfiling orders', currentState:'gorOffline' }
    ]
    const item2 = [
      { tab: 'SYSTEM', Status: '2 alerts', currentState:'gorOnline' }
    ]
    const item3 = [
      { tab: 'ORDERS', Status: '70% fulfilled', currentState:'gorError' }
    ]
    const item4 = [
      { tab: 'INVENTORY', Status: '78% space utilised', currentState:'gorOffline' }
    ]
    const item5 = [
      { tab: 'USERS', Status: '35 users logged in', currentState:'gorOffline' }
    ]
     var temp = "krishna";
		return (
		<div className="gorTabs gorMainBlock">
		<Link to="/overview">
			<Tab items={item1} temp={temp}/>
		</Link>

		<Link to="/system">
			<Tab items={item2}/>
		</Link>

		<Link to="/orders">
			<Tab items={item3}/>
		</Link>
		
		<Link to="/inventory">
			<Tab items={item4}/>
		</Link>
		
		<Link to="/users">
			<Tab items={item5}/>
		</Link>
	</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    
    return  {
         "ppsData":state.recieveSocketActions.ppsData || {}
    }
}

export default connect(mapStateToProps)(Tabs) ;