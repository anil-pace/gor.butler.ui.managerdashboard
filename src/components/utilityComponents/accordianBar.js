import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedDate } from 'react-intl';

class AccordianBar extends React.Component{
	constructor(props)  
	{
    	super(props);
    }
	render(){
		return (
			<div> 
			<div className={this.props.showPanel?"gor-utility-accordian-open":"gor-utility-updown-bar"}  onClick={() => this.props.handleAccordianState(this.props.index)}>
	    							<div className="gor-inline gor-utility-accordian-arrow-wrap">
	    								<div className={this.props.showPanel?"gor-down-arrow":"gor-right-arrow"}/>
	    							</div>
	    							<div className="gor-inline">
	    								<div className="gor-utility-master-h1">{"File "+this.props.data.seq_num}</div>
	    								<div className="gor-utility-master-h2">{"Status: "+this.props.completed + "% completed"}</div> 
	    							</div>
	    							<div className="gor-inline gor-utility-master-h2"> 
	    								<FormattedDate
								            value={new Date(this.props.data.create_time)}
								            month='short'
							                day='2-digit'
							                hour="2-digit"
							                minute="2-digit"
								        />
	    								
	    							</div>
	    						</div>
	    						{this.props.showPanel?<div className="gor-utility-accordian">
	    							<div className="gor-utility-accordian-border"/>
	    							<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records added</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">{this.props.data.created +" lines"}</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records updated</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">{this.props.data.updated +" lines"}</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Records deleted</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">{this.props.data.deleted +" lines"}</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    								<div className="gor-inline gor-utility-accordian-h1">Errors</div> 
	    								<div className="gor-inline gor-utility-accordian-h3">-</div> 
	    								<div className="gor-inline gor-utility-accordian-h2">{this.props.data.error +" lines"}</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    						  		<div className="gor-inline gor-utility-accordian-h1">Upload file:</div>
	    						  		<a href={this.props.data.request_file} download className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">DOWNLOAD</a>
	    						  	</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    						  		<div className="gor-inline gor-utility-accordian-h1">Result file:</div>
	    						  		<a href={this.props.data.response_file?this.props.data.response_file:"javascript:void(0)"} download className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">DOWNLOAD</a>
	    						  	</div>
	    						</div>:""}
    						 </div>
		);
	}
};

export default AccordianBar ;