
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

  	componentDidMount(){
    	if(this.props.setSpinner){
    		if(this.props.isLoading === true)
    		{
   		 	 setTimeout(this.props.setSpinner.bind(this,false), 5000);    	
    		}
    	}
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