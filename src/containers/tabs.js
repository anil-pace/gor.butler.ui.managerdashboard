import React  from 'react';
import ReactDOM  from 'react-dom';
import Tab from '../components/tabs/tab';
class Tabs extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<div className="gorTabs gorMainBlock">
		<Tab/>
		<Tab/>
		<Tab/>
		<Tab/>
		<Tab/>
	</div>
		);
	}
};

export default Tabs ;