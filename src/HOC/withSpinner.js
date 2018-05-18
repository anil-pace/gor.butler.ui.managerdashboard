import React  from 'react';
import Spinner from '../components/spinner/Spinner';



export  const withSpinner = function(WrappedComponent){
 	
    
    return class  WithSpinner extends WrappedComponent {
    constructor(props){
    	super(props)
    }
    render() {
      return (<div className={"withSpinner"}>
      {this.props.isLoading && <Spinner  setSpinner={this.props.setSpinner}>
      	{this.spinnerHTML}
      </Spinner>}
      {super.render()}
      </div>)
    }
  }
}
   
   
    
  


