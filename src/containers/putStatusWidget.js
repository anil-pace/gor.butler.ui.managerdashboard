import React  from 'react';
import ReactDOM  from 'react-dom';
import Tilex from '../components/tile1x/Tilex';

class PutStatusWidget extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{
    	super(props)
    }	
    render()
    {
    	return (
			 <Tilex items={this.props.items}/>
    	);
    }

 }

 

 export default PutStatusWidget;