
import React  from 'react';

class Spinner extends React.Component{ 
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */ 
  
 componentDidMount(){
   if(this.props.setSpinner){
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
       <div className={"loader "+(this.props.utilClassNames || "")} >
       {this.props.children}
       </div>
       );
    }
  };
/**
 * [Passing Router to component through context]
 * @type {Object}
 */
 Spinner.propTypes={
  utilClassNames:React.PropTypes.string,
  isLoading:React.PropTypes.bool,
  children:React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
    ])
}
export  default Spinner;