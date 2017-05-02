import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';

class AccordianBar extends React.Component{
	constructor(props)  
	{
    	super(props);
    }

   

    
	render(){
		return (
			<div> 
	    						<div className={this.props.showPanel?"gor-utility-accordian-open":"gor-utility-updown-bar"}  onClick={this.props.handleAccordianState.bind(this,this.props.index)}>
	    							<div className="gor-inline gor-utility-accordian-arrow-wrap">
	    								<div className={this.props.showPanel?"gor-down-arrow":"gor-right-arrow"}/>
	    							</div>
	    							<div className="gor-inline">
	    								<div className="gor-utility-master-h1">{this.props.data}</div>
	    								<div className="gor-utility-master-h2">Status: 100% completed</div> 
	    							</div>
	    							<div className="gor-inline gor-utility-master-h2"> 
	    								2 April 2017, 10:57 
	    							</div>
	    						</div>
	    						{this.props.showPanel?<div className="gor-utility-accordian">
	    							<div className="gor-utility-accordian-border"/>
	    							<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records added</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">48 lines</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records updated</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">3 lines</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records deleted</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">0 lines</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Errors</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">0</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    						  		<div className="gor-inline gor-utility-accordian-h1">Upload file:</div>
	    						  		<div className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">DOWNLOAD</div>
	    						  	</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    						  		<div className="gor-inline gor-utility-accordian-h1">Result file:</div>
	    						  		<div className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">DOWNLOAD</div>
	    						  	</div>
	    						</div>:""}
    						 </div>
		);
	}
};

export default AccordianBar ;