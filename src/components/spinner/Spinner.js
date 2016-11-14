
import React  from 'react';
import ReactDOM  from 'react-dom';



class Spinner extends React.Component{ 
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */ 
	constructor(props) 
	{  
    	super(props); 
  	}	
  	
  
  	
  	/**Render method called when component react renders
  	 * @return {[type]}
  	 */
	render(){
		return (
			<div className="loader" style={this.props.isLoading ? {display:'block'} : {display:'none'}}></div>
		);
	}
};
/**
 * [Passing Router to component through context]
 * @type {Object}
 */

export  default Spinner;