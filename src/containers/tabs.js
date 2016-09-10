import React  from 'react';
import ReactDOM  from 'react-dom';
import Tab from '../components/tabs/tab';
import {Link}  from 'react-router';
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
		return (
		<div className="gorTabs gorMainBlock">
		<Link to="/overview">
			<Tab items={item1}/>
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
};

export default Tabs ;